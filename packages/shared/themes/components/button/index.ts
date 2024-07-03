export const buttonFilled = (color: string) => {
  const styleColor = `bg-${color}-600 text-black shadow-2xl shadow-${color}-900 hover:shadow-lg hover:bg-${color}-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none`;
  return styleColor;
};

export const buttonHover = {
  blue: 'bg-blue-200 text-white shadow-2xl shadow-blue-900 hover:shadow-lg hover:bg-blue-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none',
};

export const buttonOutlined = (color: string) => {
  const styleColor = `border border-${color}-600 text-${color}-600 hover:opacity-75 focus:ring focus:ring-${color}-200 active:opacity-[0.85]`;
  return styleColor;
};

export const buttonText = (color: string) => {
  const styleColor = `text-${color}-600 hover:bg-${color}-600/10 active:bg-${color}-600/30`;
  return styleColor;
};

export const buttonSize = {
  sm: 'text-center text-xs py-2 px-1 rounded-lg',
  md: 'text-center text-md py-3 px-2 rounded-lg',
  lg: 'text-center text-lg py-3.5 px-3 rounded-lg',
};

export const roundButtonSize = {
  sm: 'items-center justify-center rounded-full h-8 w-8 shadow-2xl',
  md: 'items-center justify-center rounded-full h-12 w-12 shadow-2xl',
  lg: 'items-center justify-center rounded-full h-16 w-16 shadow-2xl',
};
