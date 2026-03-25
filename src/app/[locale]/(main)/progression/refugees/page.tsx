import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Lightbulb, AlertTriangle, Ticket, Building2, Send, Star, Briefcase, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '피난민 시스템 가이드 | KLZ Guide' : 'Hướng dẫn Hệ thống Người tị nạn | KLZ Guide',
    description: locale === 'ko'
      ? '피난민 시스템 완벽 가이드 - 피난민 유형, 모집권 전략, 파견 우선순위'
      : 'Hướng dẫn hoàn chỉnh hệ thống người tị nạn - loại người tị nạn, chiến lược vé, ưu tiên cử đi',
  };
}

export default async function RefugeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RefugeesContent locale={locale} />;
}

function RefugeesContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const refugeeTypes = [
    {
      name: isKorean ? '외교관 (Diplomat)' : 'Diplomat',
      building: isKorean ? '연맹 센터' : 'Alliance Center',
      bonus: isKorean ? '연맹 헬프 용량/시간 증폭' : 'Tăng dung lượng/thời gian help liên minh',
      icon: Briefcase,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      priority: isKorean ? '최우선' : 'Highest',
      desc: isKorean ? '헬프 시간 증폭으로 건설/연구/치료 가속 — 복리 효과' : 'Tăng thời gian help → tăng tốc xây/NC/chữa — hiệu ứng lãi kép',
    },
    {
      name: isKorean ? '집사 (Butler)' : 'Butler',
      building: isKorean ? '본부(HQ)' : 'HQ',
      bonus: isKorean ? '자원 생산량 증가' : 'Tăng sản xuất tài nguyên',
      icon: Building2,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      priority: isKorean ? '높음' : 'Cao',
      desc: isKorean ? '패시브 자원 수입 증가 - 장기적으로 큰 차이' : 'Tăng thu nhập tài nguyên thụ động - khác biệt lớn lâu dài',
    },
    {
      name: isKorean ? '과학자 (Scientist)' : 'Scientist',
      building: isKorean ? '연구소' : 'Research Lab',
      bonus: isKorean ? '연구 속도 증가' : 'Tăng tốc nghiên cứu',
      icon: Building2,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      priority: isKorean ? '높음' : 'Cao',
      desc: isKorean ? '연구 속도 버프 - 성장에 직결되는 핵심 피난민' : 'Buff tốc độ NC - người tị nạn then chốt cho phát triển',
    },
    {
      name: isKorean ? '간호사 (Nurse)' : 'Nurse',
      building: isKorean ? '병원' : 'Hospital',
      bonus: isKorean ? '치료 속도/용량 증가' : 'Tăng tốc độ/dung lượng chữa trị',
      icon: Heart,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      priority: isKorean ? '중' : 'Trung bình',
      desc: isKorean ? 'PvP/이벤트 후 병력 회복에 중요' : 'Quan trọng cho hồi phục quân sau PvP/event',
    },
    {
      name: isKorean ? '장교 (Officer)' : 'Officer',
      building: isKorean ? '훈련소' : 'Training Camp',
      bonus: isKorean ? '훈련 속도 증가' : 'Tăng tốc huấn luyện',
      icon: Users,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      priority: isKorean ? '높음' : 'Cao',
      desc: isKorean ? '병력 훈련 속도 버프 - 전투력 향상에 필수' : 'Buff tốc độ huấn luyện - cần thiết cho tăng CP',
    },
    {
      name: isKorean ? '교관 (Instructor)' : 'Instructor',
      building: isKorean ? '사관학교' : 'Academy',
      bonus: isKorean ? '영웅 EXP 획득 증가' : 'Tăng EXP hero',
      icon: Star,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      priority: isKorean ? '중' : 'Trung bình',
      desc: isKorean ? '영웅 육성 속도 향상 - 장기적 투자' : 'Tăng tốc phát triển hero - đầu tư dài hạn',
    },
  ];

  const ticketThresholds = [
    {
      tickets: '500',
      label: isKorean ? '소량 소환' : 'Triệu hồi nhỏ',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: isKorean
        ? '기본 피난민 획득 가능. 초보자에게 적합하지만 고급 피난민 확률 낮음.'
        : 'Có thể nhận người tị nạn cơ bản. Phù hợp cho người mới nhưng xác suất cao cấp thấp.',
      recommended: false,
    },
    {
      tickets: '2,000',
      label: isKorean ? '권장 소환' : 'Triệu hồi khuyến nghị',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      desc: isKorean
        ? '고급 피난민 보장 구간. 무과금/소과금 플레이어에게 최적의 투자 단위.'
        : 'Đảm bảo người tị nạn cao cấp. Đơn vị đầu tư tối ưu cho F2P/ít tiền.',
      recommended: true,
    },
    {
      tickets: '5,000',
      label: isKorean ? '대량 소환' : 'Triệu hồi lớn',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: isKorean
        ? '최고급 피난민 보장. 장기간 모집권을 모아서 한 번에 사용하는 전략.'
        : 'Đảm bảo người tị nạn tốt nhất. Chiến lược tích vé lâu dùng một lần.',
      recommended: false,
    },
  ];

  const dispatchPriority = [
    {
      rank: 1,
      type: isKorean ? '과학자' : 'Scientist',
      reason: isKorean ? '연구 속도는 성장의 핵심 - 최우선 파견' : 'Tốc độ NC là chìa khóa phát triển - ưu tiên số 1',
      color: 'text-purple-400',
    },
    {
      rank: 2,
      type: isKorean ? '장교' : 'Officer',
      reason: isKorean ? '훈련 속도 = 전투력 직결. 병력이 많을수록 강해집니다' : 'Tốc độ HL = liên quan trực tiếp CP. Càng nhiều quân càng mạnh',
      color: 'text-yellow-400',
    },
    {
      rank: 3,
      type: isKorean ? '집사' : 'Butler',
      reason: isKorean ? '자원 생산 증가는 패시브로 모든 활동에 도움' : 'Tăng sản xuất tài nguyên hỗ trợ mọi hoạt động thụ động',
      color: 'text-green-400',
    },
    {
      rank: 4,
      type: isKorean ? '간호사' : 'Nurse',
      reason: isKorean ? 'PvP를 자주 한다면 우선순위 상향' : 'Nếu PvP nhiều thì nâng ưu tiên',
      color: 'text-red-400',
    },
    {
      rank: 5,
      type: isKorean ? '교관' : 'Instructor',
      reason: isKorean ? '영웅 육성은 장기 투자 - 여유가 있을 때' : 'Phát triển hero là đầu tư dài hạn - khi có dư',
      color: 'text-orange-400',
    },
    {
      rank: 6,
      type: isKorean ? '외교관' : 'Diplomat',
      reason: isKorean ? '연맹 버프는 부가적 - 다른 피난민 우선' : 'Buff liên minh phụ - ưu tiên người tị nạn khác',
      color: 'text-blue-400',
    },
  ];

  const tips = [
    isKorean
      ? '피난민 모집권은 2,000장 단위로 모아서 한 번에 사용하세요 - 고급 보장 구간입니다'
      : 'Tích vé người tị nạn 2,000 vé rồi dùng một lần - đảm bảo cao cấp',
    isKorean
      ? '난폭 두목 이벤트에서 피난민 모집권을 획득할 수 있습니다'
      : 'Có thể nhận vé người tị nạn từ event Furylord',
    isKorean
      ? '과학자와 장교를 최우선으로 파견하세요 - 성장 속도에 직접적인 영향'
      : 'Cử Scientist và Officer ưu tiên - ảnh hưởng trực tiếp tốc độ phát triển',
    isKorean
      ? '중복 피난민은 분해하여 코인으로 교환할 수 있습니다'
      : 'Người tị nạn trùng có thể phân giải đổi coin',
    isKorean
      ? '매일 무료 소환을 잊지 마세요 - 작지만 꾸준히 쌓입니다'
      : 'Đừng quên triệu hồi miễn phí hàng ngày - ít nhưng tích dần',
    isKorean
      ? '이벤트 기간 중 피난민 소환 보너스가 있을 때 모집권을 사용하면 더 효율적입니다'
      : 'Dùng vé khi có bonus triệu hồi trong event sẽ hiệu quả hơn',
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
            {isKorean ? '피난민 시스템 가이드' : 'Hướng dẫn Hệ thống Người tị nạn'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '피난민 시스템을 활용하면 연구, 훈련, 자원 생산 등 다양한 버프를 얻을 수 있습니다. 올바른 파견 전략이 성장을 가속합니다.'
              : 'Hệ thống người tị nạn giúp nhận buff nghiên cứu, huấn luyện, sản xuất tài nguyên. Chiến lược cử đi đúng sẽ tăng tốc phát triển.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '6종 피난민: 외교관, 집사, 과학자, 간호사, 장교, 교관' : '6 loại: Diplomat, Butler, Scientist, Nurse, Officer, Instructor'}</li>
              <li>• {isKorean ? '파견 우선순위: 과학자 > 장교 > 집사' : 'Ưu tiên cử đi: Scientist > Officer > Butler'}</li>
              <li>• {isKorean ? '모집권 2,000장 단위 소환 권장 - 고급 보장' : 'Khuyến nghị dùng 2,000 vé/lần - đảm bảo cao cấp'}</li>
              <li>• {isKorean ? '난폭 두목에서 모집권 획득 가능' : 'Có thể lấy vé từ Furylord'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Refugee Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-highlight" />
            {isKorean ? '피난민 유형' : 'Các loại Người tị nạn'}
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
                        <span className="text-muted-foreground">{isKorean ? '건물' : 'Tòa nhà'}</span>
                        <span className="font-medium">{refugee.building}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isKorean ? '효과' : 'Hiệu ứng'}</span>
                        <span className="font-medium">{refugee.bonus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isKorean ? '우선순위' : 'Ưu tiên'}</span>
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
            {isKorean ? '모집권 소환 전략' : 'Chiến lược triệu hồi vé'}
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
                        {isKorean ? '추천' : 'Khuyến nghị'}
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
            {isKorean ? '파견 우선순위' : 'Ưu tiên cử đi'}
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
                  {isKorean ? '난폭 두목 - 모집권 획득처' : 'Furylord - Nguồn vé'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '난폭 두목 이벤트에서 피난민 모집권을 획득할 수 있습니다. 매일 참가하여 모집권을 꾸준히 모으세요. 2,000장을 목표로 모아서 한 번에 소환하는 것이 가장 효율적입니다.'
                    : 'Có thể nhận vé người tị nạn từ event Furylord. Tham gia hàng ngày để tích vé đều đặn. Mục tiêu 2,000 vé rồi triệu hồi một lần là hiệu quả nhất.'}
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
                  {isKorean ? '주의사항' : 'Lưu ý'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '500장 미만으로 소환하면 효율이 매우 낮습니다' : 'Triệu hồi dưới 500 vé hiệu quả rất thấp'}</li>
                  <li>• {isKorean ? '피난민을 건물에 배치하지 않으면 버프가 적용되지 않습니다' : 'Không đặt người tị nạn vào tòa nhà thì buff không có tác dụng'}</li>
                  <li>• {isKorean ? '중복 피난민은 방치하지 말고 분해하세요' : 'Đừng bỏ mặc người tị nạn trùng - hãy phân giải'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Mẹo'}</h2>
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
