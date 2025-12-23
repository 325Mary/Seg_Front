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
  descargandoPlantilla = false; 
  

  readonly REQUIRED_COLUMNS = [
    'NIT', 'Razon Social', 'Departamento empresa', 'Ciudad empresa',
    'Dirección', 'Teléfono empresa', 'Correo electrónico',
    'Tipo documento', 'Numero documento', 'Apellidos', 'Nombres',
    'Fecha Nacimiento', 'Género', 'Discapacidad', 'Teléfono',
    'Correo electónico', 'Departamento código', 'Departamento',
    'Municipio código', 'Municipio', 'Especialidad', 'Ficha',
    'Inicio lectiva', 'Fin lectiva', 'Inicio productiva', 'Fin productiva',
    'Contrato inicio', 'Contrato Fin', 'Regional', 'Fase',
    'Nit EPS', 'EPS', 'Nit ARL', 'ARL', 'Fecha registro', 'Modalidad'
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

 
  // ⚠️ PRIMERO: Actualiza la lista de columnas de fecha para que coincida EXACTAMENTE con tu Excel

readonly DATE_COLUMNS = [
  'Fecha Nacimiento',      
  // ← NOTA: Con espacio, no FechaNacimiento
  'Inicio lectiva',        
  // ← NOTA: Con espacio y minúscula
  'Fin lectiva',
  'Inicio productiva',
  'Fin productiva',
  'Contrato inicio',
  'Contrato Fin',
  'Fecha registro'
];



// Reemplaza el método onDocumentChange COMPLETO

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
      
      const workbook = XLSX.read(data, { 
        type: 'array',
        cellDates: false,
        cellNF: false,
        cellText: false,
        raw: true
      });
      
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      
      
      // ========== LEER ENCABEZADOS ==========
      const headers: string[] = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
        const cell = worksheet[cellAddress];
        headers.push(cell ? String(cell.v).trim() : '');
      }
      
      this.excelHeaders = headers;
      console.log('📋 Headers originales del Excel:', this.excelHeaders);
      
      
      // ========== LEER DATOS Y CONVERTIR FECHAS ==========
      const rows: any[] = [];
      const dateColumnsMap = new Map<string, boolean>();
      
      
      // Identificar qué columnas son de fecha
      headers.forEach(header => {
        const normalizedHeader = this.normalizeText(header);
        const isDateColumn = this.DATE_COLUMNS.some(col => 
          this.normalizeText(col) === normalizedHeader
        );
        dateColumnsMap.set(header, isDateColumn);
      });
      
      console.log('📅 Columnas que se convertirán:', Array.from(dateColumnsMap.entries()).filter(([k,v]) => v).map(([k]) => k));
      
      for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const rowData: any = {};
        let isEmptyRow = true;
        
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = worksheet[cellAddress];
          const header = headers[col - range.s.c];
          
          if (cell) {
            let cellValue = cell.w || String(cell.v);
            cellValue = String(cellValue).trim();
            
            
            // 🔄 CONVERTIR FECHAS automáticamente
            if (dateColumnsMap.get(header) && cellValue) {
              const originalValue = cellValue;
              cellValue = this.convertToStandardDateFormat(cellValue);
              
              if (originalValue !== cellValue) {
                console.log(`🔄 Conversión: "${originalValue}" → "${cellValue}"`);
              }
            }
            
            rowData[header] = cellValue;
            if (cellValue !== '') isEmptyRow = false;
          } else {
            rowData[header] = '';
          }
        }
        
        if (!isEmptyRow) {
          rows.push(rowData);
        }
      }
      
      this.excelData = rows;
      
      console.log('📊 Total filas:', this.excelData.length);
      console.log('🔍 Primera fila de datos:', this.excelData[0]);
      
      
      // ========== DETECTAR COLUMNAS DE FECHA ==========
      const dateColumnsFound: string[] = [];
      this.excelHeaders.forEach(header => {
        const normalizedHeader = this.normalizeText(header);
        const matchingColumn = this.DATE_COLUMNS.find(dateCol => 
          this.normalizeText(dateCol) === normalizedHeader
        );
        if (matchingColumn) {
          dateColumnsFound.push(header);
        }
      });
      
      console.log('📅 Columnas de fecha detectadas:', dateColumnsFound);
      
      if (dateColumnsFound.length === 0) {
        console.warn('⚠️ NO se detectaron columnas de fecha. Verifica DATE_COLUMNS.');
      }
      
      
      // ========== VALIDAR FECHAS ==========
      const dateValidation = this.validateAllDates(this.excelData, this.excelHeaders);
      
      console.log(`🔍 Resultado validación: ${dateValidation.valid ? '✅ VÁLIDO' : '❌ ERRORES'}`);
      console.log(`📝 Errores encontrados: ${dateValidation.errors.length}`);
      
      if (!dateValidation.valid) {
        this.docValido = false;
        
        
        // Mostrar TODOS los errores en consola para debug
        console.error('❌ TODOS LOS ERRORES DE FECHA:', dateValidation.errors);
        
        const errorsToShow = dateValidation.errors.slice(0, 20);
        const moreErrors = dateValidation.errors.length > 20 
          ? `<br><br><strong style="color: #d33;">... y ${dateValidation.errors.length - 20} errores más</strong>` 
          : '';
        
        Swal.fire({
          title: "❌ Errores de formato de fecha",
          html: `
            <div style="text-align: left; max-height: 600px; overflow-y: auto; padding: 10px;">
              <p style="font-size: 16px;"><strong>Se encontraron ${dateValidation.errors.length} fechas con formato incorrecto:</strong></p>
              <ul style="font-size: 13px; line-height: 1.8; background: #fff3cd; padding: 15px; border-radius: 5px; margin: 10px 0;">
                ${errorsToShow.map(err => `<li style="margin-bottom: 5px;">${err}</li>`).join('')}
              </ul>
              ${moreErrors}
              <br>
              <div style="background: #d4edda; border: 2px solid #39A900; padding: 15px; border-radius: 8px; margin-top: 15px;">
                <p style="color: #155724; font-weight: bold; margin: 0; font-size: 16px;">
                  ✓ Formato OBLIGATORIO: <span style="color: #39A900; font-size: 18px;">DD/MM/AAAA</span>
                </p>
                <p style="color: #155724; margin: 8px 0 0 0; font-size: 14px;">
                  Ejemplo correcto: <strong>15/03/2024</strong>
                </p>
              </div>
              <div style="background: #f8d7da; border: 2px solid #d33; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <p style="color: #721c24; font-weight: bold; margin: 0; font-size: 15px;">
                  ✗ Formatos NO permitidos:
                </p>
                <ul style="color: #721c24; margin: 8px 0 0 0; font-size: 13px; line-height: 1.6;">
                  <li>2024-03-15 (ISO con guiones)</li>
                  <li>03/15/2024 (formato US - mes primero)</li>
                  <li>2024/03/15 (año primero)</li>
                  <li>15-03-2024 (guiones en lugar de barras)</li>
                  <li>45678 (números seriales de Excel)</li>
                  <li>Texto como "TECNÓLOGO..." en columnas de fecha</li>
                </ul>
              </div>
            </div>
          `,
          icon: 'error',
          width: '800px',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'swal-wide'
          }
        });
        return;
      }

      
      // ========== VALIDAR COLUMNAS REQUERIDAS ==========
      if (this.REQUIRED_COLUMNS.length > 0) {
        if (!this.validateExcelColumns(this.excelHeaders)) {
          this.docValido = false;
          Swal.fire({
            title: "❌ Error en estructura del archivo",
            html: `
              <div style="text-align: left;">
                ${this.validationErrors.map(err => `<p style="color: #d33;">• ${err}</p>`).join('')}
              </div>
            `,
            icon: 'error',
            confirmButtonColor: '#d33'
          });
          return;
        }
      }
      
      
      // ========== TODO VALIDADO ✅ ==========
      this.docValido = true;
      this.showPreview = true;
      
      
      
    } catch (error) {
      console.error('❌ Error crítico al procesar Excel:', error);
      Swal.fire({ 
        title: "Error al leer archivo", 
        text: error.message || 'No se pudo procesar el archivo Excel', 
        icon: "error",
        confirmButtonColor: '#d33'
      });
    }
  };
  
  reader.readAsArrayBuffer(selectedFile);
}


/**
 * 🔄 Convierte fechas a formato DD/MM/AAAA
 * Soporta: 27/10/2025, 27/10/2025 09:10:00, 2025/10/27, 2025-10-27, números seriales
 * ❌ NO convierte texto (retorna el valor original para que falle la validación)
 */
convertToStandardDateFormat(dateStr: string): string {
  if (!dateStr || dateStr.trim() === '') return '';
  
  let trimmed = dateStr.trim();
  
  try {
    
    // ❌ PRIMERO: Rechazar si contiene LETRAS (no intentar convertir)
    if (/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmed)) {
      console.warn(`❌ Texto detectado (no se puede convertir): "${trimmed}"`);
      return trimmed; 
      // Retornar tal cual para que falle la validación
    }
    
    
    // ❌ Rechazar si es muy largo (probablemente texto)
    if (trimmed.length > 25) {
      console.warn(`❌ Valor muy largo (no es fecha): "${trimmed}"`);
      return trimmed;
    }
    
    
    // ✂️ Quitar hora si existe (27/10/2025 09:10:00 → 27/10/2025)
    if (trimmed.includes(' ')) {
      trimmed = trimmed.split(' ')[0];
    }
    if (trimmed.includes('T')) {
      trimmed = trimmed.split('T')[0];
    }
    
    
    // 🔢 Detectar número serial de Excel (45678 o 45678.5)
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      const serial = parseFloat(trimmed);
      const date = this.excelSerialToDate(serial);
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }
    
    
    // 🔀 Convertir formato con guiones a barras (2025-10-27 → 2025/10/27)
    if (trimmed.includes('-')) {
      trimmed = trimmed.replace(/-/g, '/');
    }
    
    
    // 📅 Procesar fecha con barras
    if (trimmed.includes('/')) {
      const parts = trimmed.split('/');
      if (parts.length === 3) {
        
        // ✅ Detectar si es AAAA/MM/DD (año primero)
        if (parts[0].length === 4) {
          const year = parts[0];
          const month = parts[1].padStart(2, '0');
          const day = parts[2].padStart(2, '0');
          return `${day}/${month}/${year}`;
        }
        
        // ✅ Ya está en DD/MM/AAAA o MM/DD/AAAA
        else {
          const day = parts[0].padStart(2, '0');
          const month = parts[1].padStart(2, '0');
          const year = parts[2];
          
          
          // Validar que sea una fecha válida
          const dayNum = parseInt(day, 10);
          const monthNum = parseInt(month, 10);
          
          if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
            return `${day}/${month}/${year}`;
          }
        }
      }
    }
    
    
    // ❌ No se pudo convertir - retornar original para que falle validación
    console.warn(`⚠️ No se pudo convertir a fecha: "${trimmed}"`);
    return trimmed;
    
  } catch (error) {
    console.error('Error al convertir fecha:', dateStr, error);
    return trimmed;
  }
}

/**
 * ✅ Valida que una fecha esté en formato DD/MM/AAAA DESPUÉS de conversión
 */
validateDateFormat(dateStr: string): boolean {
  if (!dateStr || dateStr.trim() === '') return true;
  
  const trimmed = dateStr.trim();
  
  
  // ❌ IMPORTANTE: Rechazar si contiene LETRAS (es TEXTO, no fecha)
  if (/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmed)) {
    console.warn(`❌ VALIDACIÓN FALLIDA: Contiene letras: "${trimmed}"`);
    return false;
  }
  
  
  // ❌ Rechazar texto muy largo (no es fecha)
  if (trimmed.length > 25) {
    console.warn(`❌ VALIDACIÓN FALLIDA: Muy largo: "${trimmed}"`);
    return false;
  }
  
  
  // ✅ Validar formato DD/MM/AAAA
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = trimmed.match(dateRegex);
  
  if (!match) {
    console.warn(`❌ VALIDACIÓN FALLIDA: No cumple formato DD/MM/AAAA: "${trimmed}"`);
    return false;
  }
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  
  if (month < 1 || month > 12) {
    console.warn(`❌ VALIDACIÓN FALLIDA: Mes inválido (${month}): "${trimmed}"`);
    return false;
  }
  
  if (day < 1 || day > 31) {
    console.warn(`❌ VALIDACIÓN FALLIDA: Día inválido (${day}): "${trimmed}"`);
    return false;
  }
  
  if (year < 1900 || year > 2100) {
    console.warn(`❌ VALIDACIÓN FALLIDA: Año inválido (${year}): "${trimmed}"`);
    return false;
  }
  
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    console.warn(`❌ VALIDACIÓN FALLIDA: Día ${day} no existe en mes ${month}: "${trimmed}"`);
    return false;
  }
  
  return true;
}



// ✅ Validar todas las fechas con mensajes detallados
validateAllDates(data: any[], headers: string[]): { valid: boolean, errors: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const dateColumnIndices: { index: number, name: string }[] = [];
  
  
  // Identificar columnas de fecha
  headers.forEach((header, index) => {
    const normalizedHeader = this.normalizeText(header);
    const isDateColumn = this.DATE_COLUMNS.some(col => 
      this.normalizeText(col) === normalizedHeader
    );
    if (isDateColumn) {
      dateColumnIndices.push({ index, name: header });
    }
  });
  
  console.log('📅 Columnas de fecha que se validarán:', dateColumnIndices.map(d => d.name));
  
  if (dateColumnIndices.length === 0) {
    console.warn('⚠️ ADVERTENCIA: No se detectaron columnas de fecha para validar');
  }
  
  
  // Validar cada fila
  data.forEach((row, rowIndex) => {
    dateColumnIndices.forEach(({ name }) => {
      const value = row[name];
      
      if (value && value.trim() !== '') {
        const trimmedValue = value.trim();
        
        
        // Validar que después de la conversión esté en formato correcto
        if (!this.validateDateFormat(trimmedValue)) {
          let errorMsg = `<strong>Fila ${rowIndex + 2}</strong>, columna "<strong>${name}</strong>": "<span style="color: #d33; font-family: monospace;">${trimmedValue}</span>"`;
          
          
          // ❌ Dar pistas ESPECÍFICAS sobre el error
          if (/[a-zA-Z]/.test(trimmedValue)) {
            errorMsg += ' <span style="color: #d33; font-weight: bold;">→ ¡CONTIENE TEXTO! Debe ser una fecha DD/MM/AAAA</span>';
          } else if (trimmedValue.length > 25) {
            errorMsg += ' <span style="color: #d33; font-weight: bold;">→ Texto muy largo, no es una fecha válida</span>';
          } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(trimmedValue)) {
            errorMsg += ' <span style="color: #d33;">→ No tiene formato DD/MM/AAAA</span>';
          } else {
            errorMsg += ' <span style="color: #d33;">→ Fecha inválida (verifica día/mes/año)</span>';
          }
          
          errors.push(errorMsg);
        }
      }
    });
  });
  
  if (errors.length > 0) {
    console.error('❌ ERRORES DE VALIDACIÓN DE FECHAS:', errors);
  } else {
    console.log('✅ Todas las fechas son válidas o fueron convertidas correctamente');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
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

  descargarPlantillaExcel() {
    this.descargandoPlantilla = true;
    
    Swal.fire({
      title: 'Generando plantilla...',
      html: '<div class="spinner-border text-success"></div><br>Por favor espera',
      allowOutsideClick: false,
      showConfirmButton: false
    });
    
    this.aprendicesService.descargarPlantillaExcel().subscribe(
      (blob: any) => {
        
        // Crear URL del blob
        const urlBlob = window.URL.createObjectURL(blob);
        
        
        // Crear elemento <a> para descargar
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = `plantilla_etapa_productiva_${new Date().getTime()}.xlsx`;
        
        
        // Simular click para descargar
        document.body.appendChild(link);
        link.click();
        
        
        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(urlBlob);
        
        
        // Cerrar alerta y mostrar éxito
        Swal.close();
        Swal.fire({
          title: '¡Descarga exitosa!',
          text: 'La plantilla se ha descargado correctamente',
          icon: 'success',
          confirmButtonColor: '#39A900',
          timer: 2000
        });
        
        this.descargandoPlantilla = false;
      },
      error => {
        console.error('Error al descargar plantilla:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo descargar la plantilla. Intenta nuevamente.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
        this.descargandoPlantilla = false;
      }
    );
  }

}