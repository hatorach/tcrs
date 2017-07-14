import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Reservation} from '../models/Reservation';
import {ReservationAddRequest} from 'endpoints';
import {Endpoint} from '../services/endpoint.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {Moment} from 'moment';
import * as _ from 'lodash';
import {CourtAvailability} from '../services/reservation-resolver.service';

@Component({
  templateUrl: 'reservation.component.html'
})
export default class ReservationComponent implements OnInit {
  form: FormGroup;
  startDateTime: Moment;
  startDateTimePretty: string;
  hours: FormControl;
  confirmation: FormControl;
  court: FormControl;
  courtAvailability: CourtAvailability;
  courts: Array<string>;
  hourElements = [1, 2, 3, 4];
  showConfirmationError = false;

  constructor(private formBuilder: FormBuilder, private endpoint: Endpoint, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: {courtAvailability: CourtAvailability}) => {
      this.courtAvailability = data.courtAvailability;
      this.courts = _.keys(this.courtAvailability);

      this.startDateTime = moment(this.activatedRoute.snapshot.params['day'])
        .add(this.activatedRoute.snapshot.params['hour'], 'hour');

      this.startDateTimePretty = this.startDateTime.format('LLLL');
      this.hours = this.formBuilder.control(this.hourElements[0]);
      this.court = this.formBuilder.control(this.courts[2]);
      this.confirmation = this.formBuilder.control(false, Validators.requiredTrue);
      this.form = this.formBuilder.group({
        hours: this.hours,
        confirmation: this.confirmation
      });
    });

  }

  onSubmit() {
    this.showConfirmationError = true;
    if (this.form.valid) {
      const r: ReservationAddRequest = { startDatetime: new Date(), hours: 1};
      this.endpoint.post('reservation/add', r);
      const reservation: Reservation = {
        hours: 0,
        id: '',
        startDatetime: new Date(),
        court: ''
      };
    }
  }
}