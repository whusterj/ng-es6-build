import angular from 'angular';
import testComponent from './test.component';

let testModule = angular.module('test', [])
  .component('test', testComponent)
  .name;

export default testModule;