import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/category.model';
import {CategoryService} from '../shared/category.service';
import { element } from 'protractor';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe( 
        categories => this.categories = categories,
        error => alert('Erro ao carregar as categorias. ')
    );
  }

  deleteCategory(category){
    const mustDelete = confirm("Deseja realmente excluir esse ítem ? ")
    if(mustDelete){
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element!= category),
        () => alert('erro ao tentar excluir')
      )
    }
  }

}
