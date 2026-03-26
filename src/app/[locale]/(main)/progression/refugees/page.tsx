import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Lightbulb, AlertTriangle, Ticket, Building2, Send, Star, Briefcase, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  return {
    title: l('피난민 시스템 가이드 | KLZ Guide', 'Hướng dẫn Hệ thống Người tị nạn | KLZ Guide', 'Refugee System Guide | KLZ Guide'),
    description: l(
      '피난민 시스템 완벽 가이드 - 피난민 유형, 모집권 전략, 파견 우선순위',
      'Hướng dẫn hoàn chỉnh hệ thống người tị nạn - loại người tị nạn, chiến lược vé, ưu tiên cử đi',
      'Complete refugee system guide - refugee types, recruitment ticket strategy, dispatch priorities'
    ),
  };
}

export default async function RefugeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RefugeesContent locale={locale} />;
}

function RefugeesContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const refugeeTypes = [
    {
      name: l('외교관 (Diplomat)', 'Diplomat', 'Diplomat'),
      building: l('연맹 센터', 'Alliance Center', 'Alliance Center'),
      bonus: l('연맹 헬프 용량/시간 증폭', 'Tăng dung lượng/thời gian help liên minh', 'Amplifies alliance help capacity/duration'),
      icon: Briefcase,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      priority: l('최우선', 'Highest', 'Highest'),
      desc: l('헬프 시간 증폭으로 건설/연구/치료 가속 — 복리 효과', 'Tăng thời gian help → tăng tốc xây/NC/chữa — hiệu ứng lãi kép', 'Help duration amplification accelerates construction/research/healing - compound effect'),
    },
    {
      name: l('관리인 (Butler)', 'Butler', 'Butler'),
      building: l('본부(HQ)', 'HQ', 'HQ'),
      bonus: l('자원 생산량 증가', 'Tăng sản xuất tài nguyên', 'Increases resource production'),
      icon: Building2,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      priority: l('높음', 'Cao', 'High'),
      desc: l('패시브 자원 수입 증가 - 장기적으로 큰 차이', 'Tăng thu nhập tài nguyên thụ động - khác biệt lớn lâu dài', 'Passive resource income boost - big difference long-term'),
    },
    {
      name: l('과학자 (Scientist)', 'Scientist', 'Scientist'),
      building: l('연구소', 'Research Lab', 'Research Lab'),
      bonus: l('연구 속도 증가', 'Tăng tốc nghiên cứu', 'Increases research speed'),
      icon: Building2,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      priority: l('높음', 'Cao', 'High'),
      desc: l('연구 속도 버프 - 성장에 직결되는 핵심 피난민', 'Buff tốc độ NC - người tị nạn then chốt cho phát triển', 'Research speed buff - key refugee directly tied to growth'),
    },
    {
      name: l('간호사 (Nurse)', 'Nurse', 'Nurse'),
      building: l('병원', 'Hospital', 'Hospital'),
      bonus: l('치료 속도/용량 증가', 'Tăng tốc độ/dung lượng chữa trị', 'Increases healing speed/capacity'),
      icon: Heart,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      priority: l('중', 'Trung bình', 'Medium'),
      desc: l('PvP/이벤트 후 병력 회복에 중요', 'Quan trọng cho hồi phục quân sau PvP/event', 'Important for troop recovery after PvP/events'),
    },
    {
      name: l('군관 (Officer)', 'Officer', 'Officer'),
      building: l('훈련소', 'Training Camp', 'Training Camp'),
      bonus: l('훈련 속도 증가', 'Tăng tốc huấn luyện', 'Increases training speed'),
      icon: Users,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      priority: l('높음', 'Cao', 'High'),
      desc: l('병력 훈련 속도 버프 - 전투력 향상에 필수', 'Buff tốc độ huấn luyện - cần thiết cho tăng CP', 'Training speed buff - essential for CP growth'),
    },
    {
      name: l('교관 (Instructor)', 'Instructor', 'Instructor'),
      building: l('사관학교', 'Academy', 'Academy'),
      bonus: l('영웅 EXP 획득 증가', 'Tăng EXP hero', 'Increases hero EXP gain'),
      icon: Star,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      priority: l('중', 'Trung bình', 'Medium'),
      desc: l('영웅 육성 속도 향상 - 장기적 투자', 'Tăng tốc phát triển hero - đầu tư dài hạn', 'Improves hero development speed - long-term investment'),
    },
  ];

  const ticketThresholds = [
    {
      tickets: '500',
      label: l('소량 소환', 'Triệu hồi nhỏ', 'Small Summon'),
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: l(
        '기본 피난민 획득 가능. 초보자에게 적합하지만 고급 피난민 확률 낮음.',
        'Có thể nhận người tị nạn cơ bản. Phù hợp cho người mới nhưng xác suất cao cấp thấp.',
        'Can obtain basic refugees. Suitable for beginners but low chance of advanced refugees.'
      ),
      recommended: false,
    },
    {
      tickets: '2,000',
      label: l('권장 소환', 'Triệu hồi khuyến nghị', 'Recommended Summon'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      desc: l(
        '고급 피난민 보장 구간. 무과금/소과금 플레이어에게 최적의 투자 단위.',
        'Đảm bảo người tị nạn cao cấp. Đơn vị đầu tư tối ưu cho F2P/ít tiền.',
        'Guaranteed advanced refugee. Optimal investment unit for F2P/light spenders.'
      ),
      recommended: true,
    },
    {
      tickets: '5,000',
      label: l('대량 소환', 'Triệu hồi lớn', 'Bulk Summon'),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: l(
        '최고급 피난민 보장. 장기간 모집권을 모아서 한 번에 사용하는 전략.',
        'Đảm bảo người tị nạn tốt nhất. Chiến lược tích vé lâu dùng một lần.',
        'Guaranteed top-tier refugee. Strategy of saving tickets long-term for a single use.'
      ),
      recommended: false,
    },
  ];

  const dispatchPriority = [
    {
      rank: 1,
      type: l('과학자', 'Scientist', 'Scientist'),
      reason: l('연구 속도는 성장의 핵심 - 최우선 파견', 'Tốc độ NC là chìa khóa phát triển - ưu tiên số 1', 'Research speed is the key to growth - top dispatch priority'),
      color: 'text-purple-400',
    },
    {
      rank: 2,
      type: l('군관', 'Officer', 'Officer'),
      reason: l('훈련 속도 = 전투력 직결. 병력이 많을수록 강해집니다', 'Tốc độ HL = liên quan trực tiếp CP. Càng nhiều quân càng mạnh', 'Training speed = direct CP impact. More troops means more power'),
      color: 'text-yellow-400',
    },
    {
      rank: 3,
      type: l('관리인', 'Butler', 'Butler'),
      reason: l('자원 생산 증가는 패시브로 모든 활동에 도움', 'Tăng sản xuất tài nguyên hỗ trợ mọi hoạt động thụ động', 'Resource production boost passively supports all activities'),
      color: 'text-green-400',
    },
    {
      rank: 4,
      type: l('간호사', 'Nurse', 'Nurse'),
      reason: l('PvP를 자주 한다면 우선순위 상향', 'Nếu PvP nhiều thì nâng ưu tiên', 'Raise priority if you PvP frequently'),
      color: 'text-red-400',
    },
    {
      rank: 5,
      type: l('교관', 'Instructor', 'Instructor'),
      reason: l('영웅 육성은 장기 투자 - 여유가 있을 때', 'Phát triển hero là đầu tư dài hạn - khi có dư', 'Hero development is a long-term investment - when you can spare it'),
      color: 'text-orange-400',
    },
    {
      rank: 6,
      type: l('외교관', 'Diplomat', 'Diplomat'),
      reason: l('연맹 버프는 부가적 - 다른 피난민 우선', 'Buff liên minh phụ - ưu tiên người tị nạn khác', 'Alliance buffs are supplementary - prioritize other refugees'),
      color: 'text-blue-400',
    },
  ];

  const tips = [
    l(
      '피난민 모집권은 2,000장 단위로 모아서 한 번에 사용하세요 - 고급 보장 구간입니다',
      'Tích vé người tị nạn 2,000 vé rồi dùng một lần - đảm bảo cao cấp',
      'Save Recruitment Tickets in batches of 2,000 and use them all at once - this is the guaranteed advanced tier threshold'
    ),
    l(
      '난폭 두목 이벤트에서 피난민 모집권을 획득할 수 있습니다',
      'Có thể nhận vé người tị nạn từ event Furylord',
      'You can earn Recruitment Tickets from the Furylord event'
    ),
    l(
      '과학자와 군관를 최우선으로 파견하세요 - 성장 속도에 직접적인 영향',
      'Cử Scientist và Officer ưu tiên - ảnh hưởng trực tiếp tốc độ phát triển',
      'Dispatch Scientists and Officers first - they directly impact growth speed'
    ),
    l(
      '중복 피난민은 분해하여 코인으로 교환할 수 있습니다',
      'Người tị nạn trùng có thể phân giải đổi coin',
      'Duplicate refugees can be dismantled and exchanged for coins'
    ),
    l(
      '매일 무료 소환을 잊지 마세요 - 작지만 꾸준히 쌓입니다',
      'Đừng quên triệu hồi miễn phí hàng ngày - ít nhưng tích dần',
      'Do not forget your daily free summon - small but adds up over time'
    ),
    l(
      '이벤트 기간 중 피난민 소환 보너스가 있을 때 모집권을 사용하면 더 효율적입니다',
      'Dùng vé khi có bonus triệu hồi trong event sẽ hiệu quả hơn',
      'Using tickets during event summon bonuses is more efficient'
    ),
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-intermediate">
              {t('difficulty.intermediate')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-highlight" />
            {l('피난민 시스템 가이드', 'Hướng dẫn Hệ thống Người tị nạn', 'Refugee System Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '피난민 시스템을 활용하면 연구, 훈련, 자원 생산 등 다양한 버프를 얻을 수 있습니다. 올바른 파견 전략이 성장을 가속합니다.',
              'Hệ thống người tị nạn giúp nhận buff nghiên cứu, huấn luyện, sản xuất tài nguyên. Chiến lược cử đi đúng sẽ tăng tốc phát triển.',
              'The refugee system provides buffs for research, training, resource production, and more. The right dispatch strategy accelerates your growth.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('6종 피난민: 외교관, 관리인, 과학자, 간호사, 군관, 교관', '6 loại: Diplomat, Butler, Scientist, Nurse, Officer, Instructor', '6 refugee types: Diplomat, Butler, Scientist, Nurse, Officer, Instructor')}</li>
              <li>• {l('파견 우선순위: 과학자 > 군관 > 관리인', 'Ưu tiên cử đi: Scientist > Officer > Butler', 'Dispatch priority: Scientist > Officer > Butler')}</li>
              <li>• {l('모집권 2,000장 단위 소환 권장 - 고급 보장', 'Khuyến nghị dùng 2,000 vé/lần - đảm bảo cao cấp', 'Recommended to summon in batches of 2,000 tickets - guaranteed advanced tier')}</li>
              <li>• {l('난폭 두목에서 모집권 획득 가능', 'Có thể lấy vé từ Furylord', 'Recruitment Tickets can be earned from Furylord')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Refugee Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-highlight" />
            {l('피난민 유형', 'Các loại Người tị nạn', 'Refugee Types')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {refugeeTypes.map((refugee, idx) => {
              const Icon = refugee.icon;
              return (
                <Card key={idx} className={`${refugee.bg} border-none`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-5 w-5 ${refugee.color}`} />
                      <span className={`font-bold ${refugee.color}`}>{refugee.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{l('건물', 'Tòa nhà', 'Building')}</span>
                        <span className="font-medium">{refugee.building}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{l('효과', 'Hiệu ứng', 'Effect')}</span>
                        <span className="font-medium">{refugee.bonus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{l('우선순위', 'Ưu tiên', 'Priority')}</span>
                        <Badge variant="outline" className={`${refugee.color} border-current/30 text-xs`}>
                          {refugee.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-white/10">
                      {refugee.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Ticket Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ticket className="h-6 w-6 text-yellow-400" />
            {l('모집권 소환 전략', 'Chiến lược triệu hồi vé', 'Recruitment Ticket Strategy')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {ticketThresholds.map((threshold, idx) => (
              <Card
                key={idx}
                className={`${threshold.bg} border-none ${threshold.recommended ? 'ring-2 ring-blue-500/50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-3xl font-bold ${threshold.color}`}>{threshold.tickets}</span>
                    {threshold.recommended && (
                      <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                        {l('추천', 'Khuyến nghị', 'Recommended')}
                      </Badge>
                    )}
                  </div>
                  <p className={`font-semibold ${threshold.color} mb-1`}>{threshold.label}</p>
                  <p className="text-xs text-muted-foreground">{threshold.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Dispatch Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Send className="h-6 w-6 text-purple-400" />
            {l('파견 우선순위', 'Ưu tiên cử đi', 'Dispatch Priority')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ol className="space-y-4">
                {dispatchPriority.map((item) => (
                  <li key={item.rank} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-sm">
                      {item.rank}
                    </span>
                    <div>
                      <p className={`font-semibold ${item.color}`}>{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.reason}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Furylord Ticket Source */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Ticket className="h-6 w-6 text-highlight shrink-0" />
              <div>
                <p className="font-semibold text-highlight mb-1">
                  {l('난폭 두목 - 모집권 획득처', 'Furylord - Nguồn vé', 'Furylord - Ticket Source')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {l(
                    '난폭 두목 이벤트에서 피난민 모집권을 획득할 수 있습니다. 매일 참가하여 모집권을 꾸준히 모으세요. 2,000장을 목표로 모아서 한 번에 소환하는 것이 가장 효율적입니다.',
                    'Có thể nhận vé người tị nạn từ event Furylord. Tham gia hàng ngày để tích vé đều đặn. Mục tiêu 2,000 vé rồi triệu hồi một lần là hiệu quả nhất.',
                    'You can earn Recruitment Tickets from the Furylord event. Participate daily to steadily accumulate tickets. Saving up to 2,000 and summoning all at once is the most efficient approach.'
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {l('주의사항', 'Lưu ý', 'Warning')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {l('500장 미만으로 소환하면 효율이 매우 낮습니다', 'Triệu hồi dưới 500 vé hiệu quả rất thấp', 'Summoning with fewer than 500 tickets is very inefficient')}</li>
                  <li>• {l('피난민을 건물에 배치하지 않으면 버프가 적용되지 않습니다', 'Không đặt người tị nạn vào tòa nhà thì buff không có tác dụng', 'Buffs do not apply unless you assign refugees to buildings')}</li>
                  <li>• {l('중복 피난민은 방치하지 말고 분해하세요', 'Đừng bỏ mặc người tị nạn trùng - hãy phân giải', 'Do not leave duplicate refugees idle - dismantle them')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('팁', 'Mẹo', 'Tips')}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
