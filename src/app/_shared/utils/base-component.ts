import { RequestsService } from '../services/requests.service';
import * as moment from 'moment';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Input } from '@angular/core';
export class BaseComponent {
  static dateChecker(
    _startDate: string,
    _endDate: string,
    _invalidDateTime: boolean
  ) {
    if (_startDate && _endDate && _startDate > _endDate) {
      _invalidDateTime = true;
      return;
    }
    if (!_startDate || !_endDate) {
      _invalidDateTime = true;
      return;
    }
  }
  db_errors: string = null;
  loading: boolean = false;
  success: boolean = false;
  submitted: boolean = false;
  error: string = null;
  Form: FormGroup;
  data;
  errorMessage: string;
  message;
  @Input() title: string;
  @Input() url: string;

  districtDetails = {
    Kalangala: 'ug-2595',
    Buikwe: 'ug-7073',
    Buvuma: 'ug-7074',
    Namayingo: 'ug-7075',
    Katakwi: 'ug-2785',
    Nakapiripirit: 'ug-2791',
    Kamwenge: 'ug-3385',
    Mbarara: 'ug-3388',
    Kotido: 'ug-2786',
    Agago: 'ug-7056',
    Bulambuli: 'ug-7083',
    Kween: 'ug-7084',
    Amudat: 'ug-7058',
    Kaberamaido: 'ug-1678',
    Amolatar: 'ug-1682',
    Kaliro: 'ug-1683',
    Namutumba: 'ug-1685',
    Kitgum: 'ug-7051',
    Lamwo: 'ug-2762',
    Pader: 'ug-2767',
    Sironko: 'ug-2777',
    Mbale: 'ug-2778',
    Bugiri: 'ug-2780',
    Busia: 'ug-2781',
    Butaleja: 'ug-2782',
    Mayuge: 'ug-2783',
    Manafwa: 'ug-2779',
    Tororo: 'ug-2784',
    Masaka: 'ug-3382',
    Kasese: 'ug-3384',
    Ntungamo: 'ug-3389',
    Bushenyi: 'ug-3383',
    Rukungiri: 'ug-3390',
    Ibanda: 'ug-3386',
    Mbararaa: 'ug-3391',
    Kabale: 'ug-3392',
    Kanungu: 'ug-3394',
    Nebbi: 'ug-2750',
    Zombo: 'ug-7048',
    Ngora: 'ug-7080',
    Bukedea: 'ug-7081',
    Budaka: 'ug-1684',
    Kibuku: 'ug-7082',
    Pallisa: 'ug-1688',
    Serere: 'ug-7079',
    Kalungu: 'ug-7068',
    Gomba: 'ug-7070',
    Amuru: 'ug-7049',
    Amuria: 'ug-2787',
    Otuke: 'ug-7055',
    Oyam: 'ug-2769',
    Kiryandongo: 'ug-7052',
    Kibale: 'ug-2774',
    Ntoroko: 'ug-7059',
    Kyegegwa: 'ug-7060',
    Napak: 'ug-7057',
    Moroto: 'ug-2790',
    Bukwa: 'ug-2776',
    Bukomansimbi: 'ug-7067',
    Lwengo: 'ug-7065',
    Lyantonde: 'ug-7066',
    Butambala: 'ug-7069',
    Rubirizi: 'ug-7061',
    Sheema: 'ug-7063',
    Mitooma: 'ug-7062',
    Buhweju: 'ug-7064',
    Bududa: 'ug-7086',
    Jinja: 'ug-2744',
    Kayunga: 'ug-1679',
    Iganga: 'ug-1680',
    Alebtong: 'ug-7054',
    Soroti: 'ug-1686',
    Buyende: 'ug-7078',
    Kumi: 'ug-1677',
    Mpigi: 'ug-1690',
    Adjumani: 'ug-2745',
    Yumbe: 'ug-2752',
    Kampala: 'ug-2754',
    Mukono: 'ug-1687',
    Wakiso: 'ug-2757',
    Sembabule: 'ug-1689',
    Mityana: 'ug-2760',
    Nakaseke: 'ug-2761',
    Dokolo: 'ug-2766',
    Lira: 'ug-2765',
    Gulu: 'ug-2764',
    Nwoya: 'ug-2749',
    Masindi: 'ug-2768',
    Apac: 'ug-2763',
    Buliisa: 'ug-2748',
    Hoima: 'ug-2771',
    Kabarole: 'ug-2772',
    Kapchorwa: 'ug-2775',
    Kaabong: 'ug-2788',
    Abim: 'ug-2789',
    Rakai: 'ug-3381',
    Isingiro: 'ug-3387',
    Kisoro: 'ug-3393',
    Luuka: 'ug-7076',
    Kamuli: 'ug-1681',
    Arua: 'ug-2746',
    Koboko: 'ug-2747',
    Moyo: 'ug-2751',
    Luweero: 'ug-2758',
    Mubende: 'ug-2759',
    Nakasongola: 'ug-2756',
    Bundibugyo: 'ug-2770',
    Kyankwanzi: 'ug-7072',
    Kole: 'ug-7053',
    Maracha: 'ug-2753',
    Kiboga: 'ug-2755',
    Kyenjojo: 'ug-2773'
  };

  constructor(protected requestService: RequestsService) {}

  clearMessage() {
    this.error = '';
    this.db_errors = '';
    this.success = false;
  }

  /**
   * Request for account
   * @param data
   */
  createAccount(data) {
    this.loading = true;
    this.clearMessage();
    this.requestService.post(this.url, data).subscribe(
      (res: any) => {
        this.loading = false;
        this.success = true;
      },
      error => {
        this.loading = false;
        this.db_errors = error.error;
      }
    );
  }

  handleSubmit(formData: any) {
    this.submitted = true;
    if (this.Form.valid) {
      const { value } = this.Form;
      this.createAccount(value);
    }
    return;
  }

  getUser(id) {
    this.loading = true;
    this.requestService.get(`account/${id}`, id).subscribe((res: any) => {
      this.loading = false;
      this.data = res.user;
      this.message = res.message;
    });
  }

  loadData(endpoint: string, param: string = null) {
    return this.requestService.get(endpoint, param);
  }
}
