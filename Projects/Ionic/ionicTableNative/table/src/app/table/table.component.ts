const jspdf = require('jspdf');
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
interface Coverage {
  coverageId: string;
  coverageTitle: string;
  coverageDesc: string;
  coveragePeriodNum?: number | null;
  currencyIsoCode?: string | null;
  coverageAmn?: string | null;
  sumInsuredAmn?: string | null;
  requiredInd?: string | null;
  deductibleValue?: string | null;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  headerColumn: any[] = [];
  data: any[] = [];
  @ViewChild('tablaPdf') content!: ElementRef;

  coverage: Coverage[] = [
    {
      coverageId: '1001',
      coverageTitle: 'Responsabilidad civil',
      coverageDesc:
        'Cobertura básica exigida por la Ley de Tránsito que te ampara por cualquier daño que ocasiones a un tercero.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1003',
      coverageTitle: 'Robo y/o hurto total',
      coverageDesc:
        'Desaparición total de tu auto como consecuencia de un robo o de un hurto.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '11',
      coverageTitle: 'Seguro de Accidentes Personales',
      coverageDesc:
        ' Seguro de Accidentes Personales, en caso de fallecimiento, por cada ocupante del vehículo.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1005',
      coverageTitle: 'Incendio total sin franquicia',
      coverageDesc:
        'Daño total de tu auto ocasionado por la acción directa del fuego.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1007',
      coverageTitle: 'Destrucción total por accidente',
      coverageDesc:
        'Se considerará destrucción total del auto, cuando el costo de las reparaciones por el daño sufrido en el siniestro supere el 80% del valor de plaza en el mercado del vehículo siniestrado.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1006',
      coverageTitle: 'Incendio parcial sin franquicia',
      coverageDesc:
        'Daño de alguna de las partes de tu auto ocasionado por la acción directa del fuego.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1013',
      coverageTitle: 'Rotura de cristales laterales del vehículo',
      coverageDesc:
        'Cobertura que ampara el daño en los cristales laterales de tu vehículo.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '10',
      coverageTitle: 'Rotura de luneta y parabrisas sin franquicia',
      coverageDesc:
        'Rotura de luneta y parabrisas del vehículo por cualquier causa sin franquicia.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1115',
      coverageTitle: 'Rotura de cristales de techo del vehículo',
      coverageDesc:
        'Cobertura que ampara el daño sufrido en los critales de techo del vehículo.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1010',
      coverageTitle: 'Daños parciales con franquicia',
      coverageDesc:
        'Daño parcial de tu vehículo como consecuencia de accidente, choque o vuelco con una franquicia del 5%.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1020',
      coverageTitle: 'Pérdida y/o Daños parciales',
      coverageDesc:
        'Pérdida y/o Daños parciales como consecuencia de un robo/hurto total.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '48',
      coverageTitle: 'Rotura de cerraduras',
      coverageDesc:
        'Cobertura que ampara el daño en las cerraduras de tu auto. Representa el 3% de la suma asegurada de tu auto.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1111',
      coverageTitle: 'Daños parciales como consecuencia de granizo',
      coverageDesc:
        'Cobertura que ampara los daños ocasionados a tu auto por la caída de granizo. Representa el 6% de la suma asegurada de tu auto.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1114',
      coverageTitle: 'Daños parciales por inundación',
      coverageDesc:
        'Cobertura que ampara el daño que sufra tu auto en caso de inundación.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '1103',
      coverageTitle: 'Asistencia en viaje las 24 Hs',
      coverageDesc: 'Asistencia en viaje las 24 horas al vehículo.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
    {
      coverageId: '90',
      coverageTitle: 'Defensa Penal',
      coverageDesc:
        'MAPFRE se hace cargo de tu defensa desde las primeras instancias hasta el fin del proceso. Si eleg&iacute;s la defensa de otro profesional, MAPFRE participa en un porcentaje de dinero estipulado en tu cobertura.',
      coveragePeriodNum: null,
      currencyIsoCode: null,
      coverageAmn: null,
      sumInsuredAmn: null,
      requiredInd: null,
      deductibleValue: null,
    },
  ];
  constructor() {}

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('polizas')!);
    if (this.data) {
      this.data.forEach((e:any)=>{
        this.headerColumn.push( {
          name: e.commercialProductName,
          quoteId: e.quoteId,
        })
      })
      // localStorage.removeItem('polizas')
    }
  }

  coverageIncluded(coverageId: string, productCode: string): string {
    let result = 'N';
    const comparativeData = this.data.find(
      (item) => item.commercialProductCode === productCode
    );
    const coverage = comparativeData?.coverages.find(
      (item:any) => item.coverageId === coverageId
    );

    if (coverage) {
      result = 'S';
      if (coverage?.sumInsuredAmn != null) {
        if (coverage?.sumInsuredAmn > 0) {
          result = 'I';
        }
      }
    } else {
      result = 'N';
    }
    return result;
  }

  getSumInsureAmn(coverageId: string, productCode: string): number {
    let result = 0;
    const comparativeData = this.data.find(
      (item:any) => item.commercialProductCode === productCode
    );

    if (comparativeData) {
      const coverage = comparativeData.coverages.find(
        (item:any) => item.coverageId === coverageId
      );
      if (coverage) {
        result = coverage.sumInsuredAmn;
      }
    }
    return result;
  }
  test(e:any){
    console.log(e);

  }
  async print(){

    const doc = new jspdf();

    const specialElementHandlers = {
      '#editor': function (element:any, renderer:any) {
        return true;
      }
    };
    console.log( this.content);

    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');

}
}
