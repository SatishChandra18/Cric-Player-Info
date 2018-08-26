import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-tree',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  @Input('data') items: Array<Object>;
  @Input('key') key: string;
  @Output() selected = new EventEmitter<boolean>();
  
  onSelected(playerName: any) {
    this.selected.emit(playerName); 
  }  
  selectPlayer(name: any) {
    this.selected.emit(name);  
  }
}
