import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactFeedDialogComponent } from '../contact-feed';

import {
  Contact,
  ContactService,
} from '../shared';
import { constants } from './contact-detail.constants';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  public loadingContactMessage: string = constants.LOADING_CONTACT_MESSAGE;
  public noContactFoundMessage: string = constants.NO_CONTACT_FOUND_MESSAGE;
  public isLoading: boolean = true;
  public contact: Contact = null;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private dialog: MdDialog) { }

  ngOnInit() {
    this.loadContact();
  }

  private loadContact(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.contactService.getContact(id)
        .then(contact => {
          this.isLoading = false;
          this.contact = contact;
      });
    });
  }

  openDialog(): void {
    console.log('open dialog')
    let dialogRef = this.dialog.open(ContactFeedDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
