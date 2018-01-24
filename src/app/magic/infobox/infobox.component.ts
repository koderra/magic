import {Component, Input, OnInit} from '@angular/core';

export interface BlockReadyComponent {
  ready: () => void;
}

@Component({
  selector: 'mg-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class MgInfoBoxComponent implements OnInit {

  @Input() type;

  ngOnInit(): void {
  }
}

