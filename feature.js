(function( ng ) {

	var moduleName = ng.module( "LazyLoadPOC", [ "InVision" ] )
		.directive(
			"lazyPoc",
			function LazyPocDirective( fakeCssModuleCompiler ) {

				// The fakeCssModuleCompiler is a Service defined in the existing
				// application. This will make sure that this lazy-injected directive can
				// make use of the existing application aspects.
				return({
					compile: fakeCssModuleCompiler( "c-lazy" ),
					controller: "lazyPoc.Controller",
					controllerAs: "vm",
					restrict: "E",
					scope: true,
					template: (
						"<div style='background: white ; color: black ; padding: 10px 15px ; position: fixed ; z-index: 999 ;'>" +
							"URL: {{ vm.url }}" +
						"</div>"
					)
				});

			}
		)
		.controller(
			"lazyPoc.Controller",
			function LazyController( $location, $scope ) {

				var vm = this;

				vm.url = $location.url();

				// Listen for changes in the URL so that we can make sure that change-
				// detection digests are being applied to this injected element.
				$scope.$on(
					"$locationChangeSuccess",
					function handleLocationChange() {

						vm.url = $location.url();

					}
				);

			}
		)
		.run(
			function init( $compile, $rootScope, config ) {

				console.group( "Lazy Load POC" );
				console.log( "Initializing run blocks." );
				console.log( "Prototype:", config.project.name );
				console.log( "Share Key:", config.share.key );
				console.groupEnd();

				// Compile, inject, and integrate the test component with the existing
				// AngularJS application.
				$compile( "<lazy-poc></lazy-poc>" )(
					$rootScope.$new(),
					function injectClone( ngElement, scope ) {

						document.body.appendChild( ngElement[ 0 ] );
						scope.$applyAsync();

					}
				);

			}
		)
		.name
	;

	// As of AngularJS 1.6.7, we can use .loadNewModules() to lazy-load modules into an
	// AngularJS application. Huge shout-out to Felix Mosheev for pointing me in this
	// direction with his demo gist:
	// --
	// https://gist.github.com/felixmosh/088657e92390d7450c94216f62ddc738
	ng
		.element( document )
		.injector()
		.loadNewModules( [ moduleName ] )
	;

})( angular );
