import {Compiler, ComponentRef, Injectable, Injector, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class MgModalService {
  private vcRef: ViewContainerRef;
  private injector: Injector;
  private _active;

  constructor(private compiler: Compiler) {

  }

  register(vcRef: ViewContainerRef, injector: Injector) {
    this.vcRef = vcRef;
    this.injector = injector;
  }

  get active() {
    return this._active;
  }

  closeActive() {
    if (this._active) {
      this._active.destroy();
    }
  }

  create<T>(module: any, component: any, parameters?: Object): Observable<ComponentRef<T>> {
    const componentRef$ = new ReplaySubject();
    this.compiler.compileModuleAndAllComponentsAsync(module)
      .then(factory => {
        const componentFactory = factory.componentFactories.filter(item => item.componentType === component)[0];

        console.log('Chosen Factory: ' + JSON.stringify(componentFactory, null, 2));

        if (this.vcRef) {
          const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
          const componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
          Object.assign(componentRef.instance, parameters); // pass the @Input parameters to the instance

          //
          // // this.activeInstances ++;
          // // componentRef.instance["componentIndex"] = this.activeInstances;

          componentRef.instance['destroy'] = () => {
            componentRef.destroy();
          };
          this._active = componentRef.instance;

          componentRef$.next(componentRef);
          componentRef$.complete();
        } else {
          console.error('mg-modal-view component not initialised');
        }
      });
    return <Observable<ComponentRef<T>>> componentRef$.asObservable();
  }
}

export class MgModalContainer {
  destroy: Function;

  close(): void {
    this.destroy();
  }
}

export function MgModal() {
  return function (target) {
    Object.assign(target.prototype, MgModalContainer.prototype);
  };
}
