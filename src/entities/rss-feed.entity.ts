import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Source } from "./source.entity";
import { RssEntry } from "./rss-entry.entity";

@Entity('rss_feeds')
export class RssFeed extends BaseEntity {
  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Source, (source) => source.rssFeeds)
  @JoinColumn({ name: 'source_id' })
  source: Source;

  @OneToMany(() => RssEntry, (rssEntry) => rssEntry.rssFeed)
  rssEntries: RssEntry[];
}
