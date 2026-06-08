export interface DesignComponent {
  type: string;
  props: Record<string, any>;
}

export interface DesignDraft {
  title: string;
  description: string;
  components: DesignComponent[];
  metadata?: Record<string, any>;
}
