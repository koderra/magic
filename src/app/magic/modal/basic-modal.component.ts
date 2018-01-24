import {Component, OnInit} from '@angular/core';
import {MgModal, MgModalService} from './modal.service';

@Component({
  selector: 'mg-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.css']
})
@MgModal()
export class MgBasicModalComponent implements OnInit {

  constructor(private modalService: MgModalService) {

  }

  nop(event) {
    event.stopPropagation();
  }

  destroy() {
    console.log('Destroying');
    this.modalService.closeActive();
  }

  ngOnInit() {
  }

}
