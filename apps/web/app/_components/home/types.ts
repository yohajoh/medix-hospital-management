export interface BasicCard {
  title: string;
  description: string;
  image?: string;
  cta?: string;
}

export interface TagCard extends BasicCard {
  tags?: string[];
  icon?: string;
}

export interface PersonCard extends BasicCard {
  role: string;
}

export interface TechCard extends BasicCard {
  align?: "left" | "right";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}
