import { Component, Injectable, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes,
} from 'date-fns';
import { BehaviorSubject, map, Observable, of, pipe, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
 
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DatePipe, formatDate } from '@angular/common';
import { calendarFormat } from 'moment';
import { B } from '@angular/cdk/keycodes';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
 
})

@Injectable({
  providedIn: 'root'
})

export class AgendaComponent {
@ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;


events: CalendarEvent[]=[];

appuntamentiDelGiorno :CalendarEvent[]=[];

  myArray$: Observable<CalendarEvent[]> = of(this.events);

  d:any;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };




  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

 

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}
  myDate = new Date();
  ngOnInit(){

   this.events= [
    
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-01-25"))),23),15),
        title: 'Visita controllo  Colletta',
        id_paziente:"254"
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-01-27"))),15),15),
        title: 'Visita controllo  Castiglio',
        id_paziente:"256"
       // actions: this.actions,
      },{
        start: addMinutes(addHours(startOfDay((new Date("2023-01-27"))),8),0),
        title: 'Visita controllo  Esposito',
        id_paziente:"257"
       // actions: this.actions,
      },{
        start: addMinutes(addHours(startOfDay((new Date("2023-01-27"))),10),35),
        title: 'Visita controllo  Illiano',
        id_paziente:"258"
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-01-27"))),10),35),
        title: 'Visita controllo  Illiano',
        id_paziente:"258"
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-01-27"))),10),35),
        title: 'Visita controllo  Illiano',
        id_paziente:"258"
       // actions: this.actions,
      },{
        start: addMinutes(addHours(startOfDay((new Date("2023-01-25"))),9),0),
        title: 'Visita controllo  Filanco',
        id_paziente:"300",
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-02-25"))),12),0),
        title: 'Cambio dieta Colletta',
        id_paziente:"254",
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-02-25"))),10),0),
        title: 'Prima visita Ciliberti',
        id_paziente:"400",
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-02-25"))),10),30),
        title: 'Prima visita Guarino',
        id_paziente:"401",
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-01-20"))),10),0),
        title: 'Prima visita Ciliberti',
        id_paziente:"400",
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-01-31"))),10),0),
        title: 'Prima visita Ogliami',
        id_paziente:"300",
       // actions: this.actions,
      },
      {
        start: addMinutes(addHours(startOfDay((new Date("2023-01-31"))),12),0),
        title: 'Prima visita RImanelli',
        id_paziente:"305",
       // actions: this.actions,
      },
    ];

   console.log("data "+this.myDate)
   this.filtraAppuntamenti(formatDate(this.myDate, 'dd-MM-yyyy','en-US').toString());
 
  }

  filtraAppuntamenti(data: string){
    console.log("sono in filtra lunghezza events "+this.events.length);
    this.appuntamentiDelGiorno=[];
    console.log("data dentro funzione "+data);
    let appuntamento;
    this.events.sort((objA, objB) => objA.start.getTime() - objB.start.getTime(),);

    for (let i = 0; i < this.events.length; i++) {

      appuntamento=formatDate(this.events[i].start,'dd-MM-yyyy h:mm ','en-US');
      
      if(appuntamento.includes(data)){
        this.appuntamentiDelGiorno.push(this.events[i]);
        console.log("aggiungi "+this.events[i].start);
      }

    }
    this.myArray$=this.myArray$.pipe(map(value=>this.appuntamentiDelGiorno))
    console.log("filtra "+this.appuntamentiDelGiorno.length+" "+this.myArray$.pipe.length);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log("ho cliccato la data "+formatDate(date,'dd-MM-yyyy','en-US'));
    this.filtraAppuntamenti(formatDate(date,'dd-MM-yyyy','en-US').toString());

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  appuntamenti(){
    console.log(" ho cliccato appuntamenti");
  }

}

// Link github : https://github.com/mattlewis92/angular-calendar/tree/v0.29.0