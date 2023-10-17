import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tutor-perfil',
  templateUrl: './tutor-perfil.page.html',
  styleUrls: ['./tutor-perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TutorPerfilPage implements OnInit {
  
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
    if (!localStorage.getItem('cod_pet')){
      this.router.navigate(['/home-tutor']);
    }
  }

  // Lógica de listagem

  petNome:any = localStorage.getItem('nome_pet');
  codPet:any = localStorage.getItem('cod_pet');
  fotoPerfil:any = localStorage.getItem('foto_perfil')

  escolherPet(pet: any){
    localStorage.setItem('nome_pet', pet.nome);
    localStorage.setItem('cod_pet', pet.cod_pet);
    localStorage.setItem('foto_perfil', pet.foto_perfil);
  }

  sair(){
    localStorage.clear();
    this.router.navigate(['/','home']);
  }

  verificarArray(items:any): any {
    return Array.isArray(items)
  }

  curtir(postagem:any){
    this.getAPI('curtir', postagem, "");

  }

  // Função que faz uma busca na API
  getAPI (metodo:any, tabela:any, parametro:any) {
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost/Aula/API/${metodo}/${tabela}/${parametro}`, false);
    const token = localStorage.getItem('token');
    if (token) {
      request.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    request.send();
    if (request.status === 200) {
      if (JSON.parse(request.responseText).ACESSO){
        console.log(JSON.parse(request.responseText).ACESSO);
        localStorage.clear();
        window.location.reload();
      } else {
        return JSON.parse(request.responseText);
      }
    } else {
      console.error('Erro na requisição:', request.status);
      return Array();
    }
  }

}
