var localAdvisorApp = angular.module('localAdvisorApp', ['uiGmapgoogle-maps', 'ui.bootstrap']).config(["$sceProvider", "uiGmapGoogleMapApiProvider", function($sceProvider, uiGmapGoogleMapApiProvider) {
  $sceProvider.enabled(false);
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCmY50zYduZyT4egMMdmHH9GGkTiIvhF_8',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
}]);
