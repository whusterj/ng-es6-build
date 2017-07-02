import angular from 'angular';
import Test from './test/test';

let componentModule = angular.module('app.components', [
    Test
  ])
  .name;

console.log('componentModule', componentModule);

export default componentModule;