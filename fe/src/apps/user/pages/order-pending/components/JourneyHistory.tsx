import { JourneyCard, JourneyTimeline, SectionHeading, TimelineText, TimelineTime, TimelineTitle } from "../styled";

interface JourneyItem {
  time: string;
  title: string;
  description: string;
}

interface JourneyHistoryProps {
  items: JourneyItem[];
}

const JourneyHistory = ({ items }: JourneyHistoryProps) => {
  const timelineItems = items.map((item, index) => ({
    color: index === 0 ? "#b5620d" : "#cfd7e4",
    children: (
      <div>
        <TimelineTime>{item.time}</TimelineTime>
        <TimelineTitle>{item.title}</TimelineTitle>
        <TimelineText>{item.description}</TimelineText>
      </div>
    ),
  }));

  return (
    <JourneyCard bordered={false}>
      <SectionHeading>Lịch sử hành trình</SectionHeading>
      <JourneyTimeline items={timelineItems} />
    </JourneyCard>
  );
};

export default JourneyHistory;
