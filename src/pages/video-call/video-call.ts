import { Component } from '@angular/core';
import { OpentokService } from '../../services/opentok-service';

declare var OT: any;

@Component({
  selector: 'page-video-call',
  templateUrl: 'video-call.html'
})
export class VideoCallPage {
  session: any;
  publisher: any;
  apiKey: string;
  sessionId: string;
  token: string;
  cameraSource = 0;
  devices: any[];

  constructor(private opentokService: OpentokService) {
    opentokService.getToken()
      .subscribe(data => {
        alert('constructor call');
        this.apiKey = data.api_key;
        this.sessionId = data.session_id;
        this.token = data.token;
      });
  }

  startCall() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.session.on('streamCreated', (event) => {
      this.session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        resolution: '1280x720',
        showControls: false,
        width: '100%',
        height: '100%'
      });
    });

    this.session.on('sessionDisconnected', (event) => {

    });

    this.session.connect(this.token, (error) => {
      if (!error) {
        OT.getDevices((error, devices) => {
          this.devices = devices.filter(element => { return element.kind == "videoInput"; });

          this.publisher = OT.initPublisher('publisher', {
            insertMode: 'append',
            resolution: '1280x720',
            width: '100%',
            height: '100%',
            videoSource: this.devices[this.cameraSource].deviceId
          });

          this.session.publish(this.publisher);
        });
      } else {
        alert('There was an error connecting to the session' + error.message);
      }
    });
  }

  endCall() {
    if (!!this.session) {
      this.session.disconnect();
    }
  }

  toggleCamera() {
    this.cameraSource = this.cameraSource == 0 ? 1 : 0;

    this.session.unpublish(this.publisher);

    this.publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      resolution: '1280x720',
      width: '100%',
      height: '100%',
      videoSource: this.devices[this.cameraSource].deviceId
    });

    this.session.publish(this.publisher);
  }
}
