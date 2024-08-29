global.Buffer = require('buffer').Buffer;
global.TextEncoder = require('text-encoding').TextEncoder;

function parseDG2(dg2Data) {
    // Convert base64 to binary
    const binaryData = Buffer.from(dg2Data, 'base64');

    // This assumes JPEG format and looks for the JPEG start marker
    const jpegStart = binaryData.indexOf(Buffer.from([0xFF, 0xD8, 0xFF]));
    if (jpegStart === -1) {
        throw new Error('JPEG data not found in DG2');
    }

    const jpegEnd = binaryData.indexOf(Buffer.from([0xFF, 0xD9]), jpegStart);
    if (jpegEnd === -1) {
        throw new Error('JPEG end marker not found');
    }

    // Extract the JPEG data
    const jpegData = binaryData.slice(jpegStart, jpegEnd + 2);

    // Convert to base64
    return jpegData.toString('base64');
}

function cleanString(input) {
    return input
        .replace(/(^\d+|\d+$)/g, '')  // Remove leading/trailing numbers
        .replace(/[=&!@#$%^*()_\-+|]/g, '')  // Remove special characters
        .replace(/\s+/g, ' ')  // Replace multiple spaces with a single space
        .trim();  // Trim leading/trailing whitespace
}

export function parsePassportData(passportData) {
    const data = JSON.parse(passportData);

    // Decode and parse DG1
    const dg1Decoded = Buffer.from(data.dg1, 'base64').toString('ascii');
    const dg2Decoded = parseDG2(data.dg2);
    const [_, documentNumber, surname, givenNames] = dg1Decoded.match(/(.{9})<{2}(.+)<{2}(.+)/);

    // Decode DG13
    const dg13DecodedBuffer = Buffer.from(data.dg13, 'base64');
    const decoder = new TextDecoder('utf-8');
    const dg13Decoded = decoder.decode(dg13DecodedBuffer);

    // Parse DG13
    const dg13Fields = {};
    let currentField = '';
    let currentValue = '';

    for (let i = 0; i < dg13Decoded.length; i++) {
        const charCode = dg13Decoded.charCodeAt(i);

        if (charCode === 2) {
            if (currentField && currentValue) {
                dg13Fields[currentField] = currentValue.trim();
            }
            currentField = dg13Decoded.charCodeAt(i + 2).toString();
            i += 3;
            currentValue = '';
        } else if (charCode >= 32 && charCode <= 126 || charCode > 127) {
            currentValue += dg13Decoded[i];
        }
    }

    if (currentField && currentValue) {
        dg13Fields[currentField] = currentValue.trim();
    }

    // Clean up fields
    const cleanField = (field) => {
        if (!field) return '';
        return field.replace(/0+$/, '')  // Remove trailing zeros
            .replace(/^[#1]/, '')  // Remove leading # or 1
            .replace(/:\d*$/, '')  // Remove trailing : and any digits
            .trim();
    };

    const parentNames = cleanField(dg13Fields['13']).split('0');

    return {
        name: cleanField(dg13Fields['2']),
        documentNumber: documentNumber,
        cardNumber: cleanField(dg13Fields['1']),
        dateOfBirth: cleanField(dg13Fields['3']).slice(0, 10),
        gender: cleanField(dg13Fields['4']),
        nationality: cleanField(dg13Fields['5']),
        ethnicity: cleanField(dg13Fields['6']),
        placeOfBirth: cleanString(cleanField(dg13Fields['8'])),
        placeOfResidence: cleanString(cleanField(dg13Fields['9'])),
        identifyingCharacteristics: cleanField(dg13Fields['10']).replace(/(^\d+|\d+$)/g, '').trim(),
        dateOfIssue: cleanField(dg13Fields['11']).slice(0, 10),
        dateOfExpiry: cleanField(dg13Fields['12']).slice(0, 10),
        fatherName: parentNames[0],
        motherName: parentNames[1],
        spouseName: cleanField(dg13Fields['14']) || '',
        passportNumber: cleanField(dg13Fields['16']),
        passportImage: `data:image/jpeg;base64,${dg2Decoded}`,
    };
}
