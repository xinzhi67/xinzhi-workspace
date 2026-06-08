import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('design_generations')
export class DesignGeneration {
  @PrimaryColumn({ type: 'char', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 32, default: 'pending' })
  status: string;

  @Column({ type: 'text' })
  prompt: string;

  @Column({ name: 'app_id', type: 'varchar', length: 64, nullable: true })
  appId: string | null;

  @Column({ name: 'user_id', type: 'varchar', length: 64, nullable: true })
  userId: string | null;

  @Column({ name: 'intent_snapshot', type: 'json', nullable: true })
  intentSnapshot: Record<string, unknown> | null;

  @Column({ name: 'plan_snapshot', type: 'json', nullable: true })
  planSnapshot: Record<string, unknown> | null;

  @Column({ name: 'draft_snapshot', type: 'json', nullable: true })
  draftSnapshot: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, unknown> | null;

  @Column({ name: 'model_meta', type: 'json', nullable: true })
  modelMeta: Record<string, unknown> | null;

  @Column({ name: 'error_code', type: 'varchar', length: 64, nullable: true })
  errorCode: string | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', precision: 6 })
  updatedAt: Date;

  @Column({ name: 'completed_at', type: 'datetime', precision: 6, nullable: true })
  completedAt: Date | null;
}
