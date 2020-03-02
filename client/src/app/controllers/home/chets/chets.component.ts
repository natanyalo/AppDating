import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChetService } from 'src/app/services/chet.service';
import { Message } from 'src/app/models/message';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chet } from '../../../models/chet.model';

@Component({
  selector: 'app-chets',
  templateUrl: './chets.component.html',
  styleUrls: ['./chets.component.css'],
})
export class ChetsComponent implements OnInit {
  private _chets: Chet;
  private _messageSub: Subscription;
  private _courentUser: string;
  constructor(
    private _chetService: ChetService,
    private _route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) { }
  ngOnInit() {
    this._chets = null
    this._courentUser = '';
    this._route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has("profileId")) {
          this._courentUser = paramMap.get("profileId");
        }
      });
    const userId = localStorage.getItem("userId");
    this._chetService.getDocument(userId, this._courentUser);
    this._messageSub = this._chetService._chets
      .subscribe((res: any) => {
        this._chets = res;
        this.ref.detectChanges();
      })
  }
  public onSendMessage(text: string) {
    const chet = {
      id: this._chets.id,
      user2: this._chets.user2,
      user1: this._chets.user1,
      messages: []
    } as Chet;
    chet.messages.push(
      {
        message: text,
        user: this._courentUser !== this._chets.user1 ? this._courentUser : this._chets.user1
      });
    this._chetService.newDocument(chet);
  }
  ngOnDestroy() {
    this._messageSub.unsubscribe();
  }

  editDoc() {
    //this._chetService.editDocument(this.document);
  }
}
