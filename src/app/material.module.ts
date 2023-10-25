import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';


const modules = [
    MatInputModule,
]

@NgModule({
    imports: [
        ...modules
    ],
    exports: [
        ...modules
    ]
})
export class MaterialModule { }
