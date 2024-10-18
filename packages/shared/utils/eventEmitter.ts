import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export enum EventEmitterEnum {
  WatchFormData = 'watch-form-data',
  RBPInformationQuestion = 'rbp-information-question',
}

export default eventEmitter;
