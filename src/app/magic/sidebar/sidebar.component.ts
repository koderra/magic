import {Component, Input, OnInit} from '@angular/core';

export interface BlockReadyComponent {
  ready: () => void;
}

@Component({
  selector: 'mg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class MgSidebarComponent implements OnInit {

  @Input() type;

  ngOnInit(): void {
  }
}

