import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AprendizService } from '../../../Services/aprendiz/aprendiz.service';
import Swal from 'sweetalert2';
import { Aprendiz_re_DTO } from '../../../models/Aprendiz/aprendiz_RE_DTO';
import { CentroFormacionService } from '../../../Services/CentroFormacion/centro-formacion.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-aprendices',
  templateUrl: './list-aprendices.component.html',
  styleUrls: ['./list-aprendices.component.css']
})
export class ListAprendicesComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  
  filterIdentificacion = "";
  pageActual: number = 1;
  docValido = false;
  nombreDoc = null;
  file = null;
  listAprendices?: Aprendiz_re_DTO[] = [];
  user_id_centro = sessionStorage.getItem("user_id_centro");
  user_id_perfil = sessionStorage.getItem("user_id_perfil");

  excelData: any[] = [];
  excelHeaders: string[] = [];
  showPreview = false;
  validationErrors: string[] = [];

  listCentros: any[] = [];
  selectedCentro: string = '';
  isPerfil4: boolean = false;

  readonly DATE_COLUMNS = [
    'FechaNacimiento', 
    'InicioLectiva', 
    'FinLectiva', 
    'InicioProductiva', 
    'FinProductiva', 
    'ContratoInicio', 
    'ContratoFin', 
    'FechaRegistro'
  ];

  readonly REQUIRED_COLUMNS = [
    // 'NIT', 'RazonSocial', 'Empresa', 'DepartamentoEmpresa', 'CiudadEmpresa',
    // 'DireccionEmpresa', 'TelefonoEmpresa', 'CorreoEmpresa', 'RepresentanteLegal',
    // 'IdentificacionRepresentanteLegal', 'TipoDocumento', 'Numerodocumento',
    // 'Nombres', 'Apellidos', 'FechaNacimiento', 'Genero', 'Telefono',
    // 'CorreoElectronico', 'CorreoMisena', 'DepartamentoAprendiz', 'MunicipioAprendiz',
    // 'Centro', 'Especialidad', 'Ficha', 'InicioLectiva', 'FinLectiva',
    // 'InicioProductiva', 'FinProductiva', 'ContratoInicio', 'ContratoFin',
    // 'Regional', 'FaseAprendiz', 'NitEPS', 'EPS', 'NitARL', 'ARL', 'Modalidad'
  ];

  constructor(
    private aprendicesService: AprendizService,
    private centroService: CentroFormacionService
  ) { }

  ngOnInit(): void {
    this.isPerfil4 = this.user_id_perfil === '4';
    
    if (this.isPerfil4) {
      this.getCentrosFormacion();
    }
    
    this.getAprendices();
  }

  getCentrosFormacion() {
    this.centroService.getcentroFormacion(this.user_id_centro, this.user_id_perfil).subscribe(
      (response: any) => {
        this.listCentros = response.results;
      },
      error => {
        console.error('Error al cargar centros:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los centros de formación',
          icon: 'error'
        });
      }
    );
  }

  getAprendices() {
    this.aprendicesService.getAprendices(this.user_id_centro, this.user_id_centro).subscribe(data => {
      this.listAprendices = data.results;
    }, error => {
      console.error(error);
    });
  }

  deleteREPwithAprendiz(id: any) {
    Swal.fire({
      title: 'Eliminar Aprendiz',
      text: '¿Estás seguro que quieres eliminar este aprendiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((results) => {
      if (results.isConfirmed) {
        this.aprendicesService.deleteREPwithAprendiz(id).subscribe(data => {
          if (data.status == 'success') {
            this.getAprendices();
            Swal.fire('Aprendiz Eliminado!', 'El aprendiz fue eliminado con éxito', 'success');
          } else {
            Swal.fire({
              title: 'Error',
              text: 'El aprendiz ya empezó su proceso de formación',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }

  normalizeText(text: string): string {
    if (!text) return '';
    return text.replace(/\s+/g, '').replace(/[áâ]/gi, 'a').replace(/[éê]/gi, 'e')
      .replace(/[íî]/gi, 'i').replace(/[óô]/gi, 'o').replace(/[úû]/gi, 'u').replace(/ñ/gi, 'n');
  }

  validateExcelColumns(headers: string[]): boolean {
    const normalizedHeaders = headers.map(h => this.normalizeText(h));
    const missingColumns = this.REQUIRED_COLUMNS.filter(col => {
      return !normalizedHeaders.includes(this.normalizeText(col));
    });

    if (missingColumns.length > 0) {
      this.validationErrors = [`Columnas faltantes: ${missingColumns.join(', ')}`];
      return false;
    }
    return true;
  }

  formatExcelDate(value: any): string {
    if (!value) return '';
    
    try {
      let dateStr = String(value).trim();
      
     
      if (dateStr.includes(' ')) {
        dateStr = dateStr.split(' ')[0];
      }
      if (dateStr.includes('T')) {
        dateStr = dateStr.split('T')[0];
      }
      
      console.log('Fecha limpia:', dateStr);
      
     
      
     
      if (dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
         
          if (parts[0].length === 4) {
           
            return `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
          } else {
           
            return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;
          }
        }
      }
      
     
      if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          if (parts[0].length === 4) {
           
            return `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
          } else {
           
            return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;
          }
        }
      }
      
     
      if (!isNaN(Number(value)) && typeof value === 'number') {
        const date = this.excelSerialToDate(value);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      }
      
     
      return '';
      
    } catch (error) {
      console.error('Error al formatear fecha:', value, error);
      return '';
    }
  }

  excelSerialToDate(serial: number): Date {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    
    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    
    const seconds = total_seconds % 60;
    total_seconds -= seconds;
    
    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;
    
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  onDocumentChange(event): void {
    const selectedFile = event.target.files[0];
    
   
    this.resetFileState();

    if (!selectedFile) return;

    if (selectedFile.size > 2000000) {
      Swal.fire({ title: "Error", text: "El archivo excede 2MB", icon: "error" });
      return;
    }

    if (!selectedFile.name.endsWith('.xlsx')) {
      Swal.fire({ title: "Error", text: "El archivo debe ser .xlsx", icon: "error" });
      return;
    }

    this.nombreDoc = selectedFile.name;
    this.file = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', raw: false });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' });

        if (jsonData.length < 2) {
          throw new Error('Excel vacío');
        }

        this.excelHeaders = jsonData[0] as string[];
        this.excelData = jsonData.slice(1).map((row: any) => {
          const rowData: any = {};
          this.excelHeaders.forEach((header, index) => {
            let value = row[index];
            
            if (value === undefined || value === null || value === '') {
              rowData[header] = '';
              return;
            }
            
            // Formatear fechas - ELIMINAR TIMESTAMP
            const normalizedHeader = this.normalizeText(header);
            const isDateColumn = this.DATE_COLUMNS.some(col => 
              this.normalizeText(col) === normalizedHeader
            );
            
            if (isDateColumn) {
              value = this.formatExcelDate(value);
              console.log(`Columna ${header} - Valor formateado:`, value);
            }
            
            rowData[header] = value;
          });
          return rowData;
        }).filter(row => Object.values(row).some(val => val !== ''));

        console.log('DATOS PROCESADOS:', this.excelData);

        if (this.validateExcelColumns(this.excelHeaders)) {
          this.docValido = true;
          this.showPreview = true;
          Swal.fire({
            title: "¡Éxito!",
            html: `Registros: ${this.excelData.length}`,
            icon: 'success',
            confirmButtonColor: "#39A900",
            timer: 2000
          });
        } else {
          this.docValido = false;
          Swal.fire({
            title: "Error en estructura",
            html: this.validationErrors.join('<br>'),
            icon: 'error'
          });
        }
      } catch (error) {
        Swal.fire({ title: "Error", text: error.message, icon: "error" });
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  }

  closePreview() {
    this.showPreview = false;
  }

  confirmImport() {
    if (this.isPerfil4 && !this.selectedCentro) {
      Swal.fire({
        title: 'Centro requerido',
        text: 'Debes seleccionar un centro de formación antes de importar',
        icon: 'warning',
        confirmButtonColor: '#39A900'
      });
      return;
    }
    
    this.closePreview();
    setTimeout(() => this.sendFile(), 100);
  }

  resetFileState() {
    this.showPreview = false;
    this.excelData = [];
    this.excelHeaders = [];
    this.validationErrors = [];
    this.docValido = false;
    this.nombreDoc = null;
    this.file = null;
    this.selectedCentro = '';
    
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  canSendFile(): boolean {
    if (!this.docValido) return false;
    
    if (this.isPerfil4 && !this.selectedCentro) {
      return false;
    }
    
    return true;
  }

  sendFile() {
    if (!this.docValido) {
      Swal.fire({ title: 'Error', text: 'Archivo inválido', icon: 'error' });
      return;
    }

    if (this.isPerfil4 && !this.selectedCentro) {
      Swal.fire({
        title: 'Centro requerido',
        text: 'Debes seleccionar un centro de formación antes de importar',
        icon: 'warning',
        confirmButtonColor: '#39A900'
      });
      return;
    }

    Swal.fire({
      title: '¿Confirmar?',
      html: `Importar <b>${this.excelData.length}</b> registros${this.isPerfil4 ? '<br>Centro: <b>' + this.getCentroNombre() + '</b>' : ''}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#39A900',
      confirmButtonText: 'Sí, importar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Importando...',
          html: '<div class="spinner-border text-success"></div>',
          allowOutsideClick: false,
          showConfirmButton: false
        });

        const centroId = this.isPerfil4 ? this.selectedCentro : this.user_id_centro;

        this.aprendicesService.createDocuments(centroId, '', this.file).subscribe(
          (res) => {
            Swal.close();
            
            if (res.status == 'success') {
              Swal.fire({ 
                title: 'Éxito', 
                text: 'Excel importado correctamente', 
                icon: 'success',
                confirmButtonColor: '#39A900'
              }).then(() => {
                this.resetFileState();
                this.getAprendices();
              });
            } else {
              Swal.fire({ 
                title: 'Error', 
                text: res.message || 'Error al importar', 
                icon: 'error' 
              });
            }
          }, 
          err => {
            Swal.close();
            console.error('Error al importar:', err);
            Swal.fire({ 
              title: 'Error', 
              text: 'Error de servidor al importar el archivo', 
              icon: 'error' 
            });
          }
        );
      }
    });
  }

  getCentroNombre(): string {
    const centro = this.listCentros.find(c => c.id_centro_formacion == this.selectedCentro);
    return centro ? centro.nombre : '';
  }
}