import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService, categories} from "../shared/admin.service";
import { map } from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
allCategories: categories[];
arrCategories: [];
count = 0;
  private child: string[];
  private slug: string;
  private routeSub: Subscription;


  constructor(public adminService: AdminService, private route: ActivatedRoute, private  router: Router) {
    this.closeHeader()
    this.getIdToUpdate()
    this.getIdToDelete()
    this.dynamicRouter()

  }

  ngOnInit(): void {
    this.showContent()
     this.routeSub = this.route.params.subscribe(params => {
       console.log(params)
      this.slug = params['slug']
    })
    }
    ngOnDestroy() {
    this.routeSub.unsubscribe()
    }

    dynamicRouter() {
    document.body.addEventListener('click', (e) => {
      let target =e.target as HTMLButtonElement;
      if (target.classList.contains('btn__admin')) {
        let id = target.id;
        this.allCategories.map(el => {
          if (el.name === id) {
            this.router.navigateByUrl(`/${el.name}/words`)
          }

        })
      }
    })


    }

  closeHeader() {
    const header = document.querySelector('header') as HTMLElement;
    header.classList.add('hide');
  }
  showContent() {
    this.adminService.getAllData().subscribe(
      (data: categories) => {
        this.allCategories = Object(data)
        console.log(this.allCategories)
        })

  }
  cardsAdd() {
    const categories = document.getElementById('addCategory') as HTMLInputElement;
    let name = categories.value;
    if (!name) { return; }
    this.adminService.postData(name).subscribe( _ => {
        this.showContent();
    })
  }
  getIdToUpdate() {
    document.body.addEventListener('click', (e) => {
      let target = e.target as HTMLButtonElement;
      if (target.classList.contains('admin__Update')) {
        let id = target.id;
        let numberId = Number(id);
        let input = target.previousSibling as HTMLInputElement;
        this.adminService.updateData(numberId, input.value).subscribe(_ => {
          this.showContent();
        })
      }
    })
  }
  getIdToDelete() {
    document.body.addEventListener('click', (e) => {
      let target = e.target as HTMLButtonElement;
      if (target.classList.contains('admin__delete')) {
        let id = target.id;
        console.log(id)
        this.adminService.deleteData(id).subscribe( _ => {
          this.showContent();
        })
      }
    })
  }

}
