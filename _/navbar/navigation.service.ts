import {Injectable} from '@angular/core';

@Injectable()
export class MgNavigationService {

  private zone = '';
  private subscribers: Array<() => void> = [];
  private features: Array<string> = [];

  public setZone(zone) {
    this.zone = zone;
    this.notify();
    return this;
  }

  public getZone(): string {
    return this.zone;
  }

  public addFeature(feature: string) {
    if (this.features.indexOf(feature) === -1) {
      this.features.push(feature);
      this.notify();
    }
    return this;
  }

  public removeFeature(feature: string) {
    let idx = this.features.indexOf(feature);
    if (idx !== -1) {
      this.features.splice(idx, 1);
      this.notify();
    }
    return this;
  }

  public getFeatures(): Array<string> {
    return this.features.slice(0);
  }

  public register(subscriber: () => void) {
    this.subscribers.push(subscriber);
    return this;
  }

  private notify() {
    for (let subscriber of this.subscribers) {
      subscriber();
    }
  }
}
