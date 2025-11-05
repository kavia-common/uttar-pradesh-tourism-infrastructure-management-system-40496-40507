import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface Project {
  id: number;
  name: string;
  status: string;
  manager: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/projects`;

  // PUBLIC_INTERFACE
  list() {
    /** Fetch list of projects from backend */
    return this.http.get<Project[]>(this.base);
  }

  // PUBLIC_INTERFACE
  get(id: number) {
    /** Fetch single project by id */
    return this.http.get<Project>(`${this.base}/${id}`);
  }

  // PUBLIC_INTERFACE
  save(project: Partial<Project>) {
    /** Create or update a project */
    if ((project as any).id) {
      return this.http.put<Project>(`${this.base}/${(project as any).id}`, project);
    }
    return this.http.post<Project>(this.base, project);
  }
}
