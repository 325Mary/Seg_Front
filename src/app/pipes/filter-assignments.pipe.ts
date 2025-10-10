import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterAssignments',
})
export class FilterAssignmentsPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultsAssignment = [];

    for (let assignment of value) {
      if (assignment.identificacion.indexOf(arg) > -1 ) {
        resultsAssignment.push(assignment);
      }
    }
    return resultsAssignment;
  }
}

