import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ClubInfo, ClubsBroker} from "./ClubsBroker";

@Injectable()
export default class ClubsResolver implements Resolve<Array<ClubInfo>> {
  constructor(private clubsBroker: ClubsBroker) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Array<ClubInfo>> {
    return this.clubsBroker.findAll();
  }
}
