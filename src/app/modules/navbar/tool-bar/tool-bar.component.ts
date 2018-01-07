import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  navLinks: any = [
    {label: 'Pessoa', link: 'pessoa', path:'/pessoa'},
    {label: 'Ministério', link: 'ministerio', path:'/ministerio'},
    {label: 'Escala', link: 'escala', path:'/escala'},
    {label: 'Favoritos', link: 'favoritos', path:'/favoritos'},
    {label: 'Documentos', link: 'documentos', path:'/documentos'},
    
  ];

  constructor() { }

  ngOnInit() {
  }

}
