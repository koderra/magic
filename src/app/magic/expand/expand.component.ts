import {Component, Input, OnInit} from '@angular/core';

export interface BlockReadyComponent {
  ready: () => void;
}

@Component({
  selector: 'mg-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.css']
})
export class MgExpandComponent implements OnInit {

  @Input() value: string;
  @Input() decorator: string;

  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  ngOnInit(): void {
  }
}

