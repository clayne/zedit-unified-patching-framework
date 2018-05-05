ngapp.controller('upfOverviewController', function($scope) {
    $scope.games = xelib.games;
    $scope.upfPages = [
        'Development/APIs/UPF Patcher API',
        'Modal Views/Manage Patchers Modal',
        'Modules/Patcher Modules',
        'Modal Views/Settings Modal/UPF Settings Tab'
    ].map(function(path) {
        return {
            label: path.split('/').last(),
            path: path
        };
    });
});

ngapp.controller('upfPatcherApiController', function($scope) {
    let apiFiles = ['patcherSchema', 'patcherHelpers', 'patcherSettings'];
    apiFiles.forEach(function(label) {
        let path = `modules/${info.id}/docs/${label}.json`;
        $scope[label] = fh.loadJsonFile(path);
    });
});

ngapp.controller('patcherModulesController', function($scope) {
    let path = `modules/${info.id}/docs/patcherVariables.json`;
    $scope.patcherVariables = fh.loadJsonFile(path);
});

let topics = [{
    path: 'Modules/Core Modules',
    topic: {
        label: 'Unified Patching Framework',
        templateUrl: `${moduleUrl}/docs/overview.html`,
        controller: 'upfOverviewController'
    }
}, {
    path: 'Modules',
    topic: {
        label: 'Patcher Modules',
        templateUrl: `${moduleUrl}/docs/patcherModules.html`,
        controller: 'patcherModulesController'
    }
}, {
    path: 'Modal Views',
    topic: {
        label: 'Manage Patchers Modal',
        templateUrl: `${moduleUrl}/docs/managePatchersModal.html`,
        children: [{
            label: 'Build Patches Tab',
            templateUrl: `${moduleUrl}/docs/buildPatches.html`
        }]
    }
}, {
    path: 'Modal Views/Settings Modal',
    topic: {
        label: 'UPF Settings Tab',
        templateUrl: `${moduleUrl}/docs/upfSettings.html`
    }
}, {
    path: 'Development/APIs',
    topic: {
        label: 'UPF Patcher API',
        templateUrl: `${moduleUrl}/docs/api.html`,
        controller: 'upfPatcherApiController'
    }
}];

ngapp.run(function(helpService) {
    topics.forEach(({path, topic}) => helpService.addTopic(topic, path));
});