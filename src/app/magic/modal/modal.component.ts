import {Component, OnInit} from '@angular/core';
import {MgModal, MgModalService} from './modal.service';

@Component({
  selector: 'mg-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@MgModal()
export class MgModalComponent implements OnInit {

  title;
  ok;
  cancel;
  alt1;
  alt2;
  alt3;

  onOk;
  onCancel;
  onAlt1;
  onAlt2;
  onAlt3;

  private active;

  constructor(private modalService: MgModalService) {
  }

  ngOnInit() {
    this.active = this.modalService.active;
    this.title = this.active.title || 'Modal';

    if (this.active.ok) {
      this.ok = {text: this.active.ok.text || 'Ok', style: this.active.ok.style};
    }

    if (this.active.cancel) {
      this.cancel = {text: this.active.cancel.text || 'Cancel', style: this.active.cancel.style};
    }

    this.onOk = this.active.onOk;

    if (this.active.onCancel === true) {
      this.onCancel = () => {
        this.modalService.closeActive();
      };
    } else {
      this.onCancel = this.active.onCancel;
    }

    console.log('ACTIVE: ' + this.active.ok);
  }
}
