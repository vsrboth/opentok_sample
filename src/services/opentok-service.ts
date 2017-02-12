import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OpentokService {

  // url = '/webrtc/opentok/room';
  url = 'https://cbs.motionscloud.com/webrtc/opentok/room';

  constructor(private http: Http) {

  }

  getToken() {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    return this.http.get(this.url, { headers: header }).map(res => res.json());
  }
}
