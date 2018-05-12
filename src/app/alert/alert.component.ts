import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../services/alerte.service";

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlerteService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}