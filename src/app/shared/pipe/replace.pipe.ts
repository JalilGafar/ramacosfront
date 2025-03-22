import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "replace"
})
export class ReplacePipe implements PipeTransform {
  transform(item: string|null, replace:string, replacement:string): any {
    if (item == null) {
        return ""
    };
    item = item.replace(replace, replacement);
    return item;
  }
}