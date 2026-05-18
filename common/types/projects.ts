export type ProjectItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  description_id?: string;
  image: string;
  link_demo?: string | null;
  link_github?: string | null;
  link_video?: string | null;
  stacks: string[];
  content?: string | null;
  content_id?: string | null;
  is_show: boolean;
  is_featured: boolean;
};

export type ProjectItemProps = {
  projects: ProjectItem[];
}
