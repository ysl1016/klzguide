import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Building2, Lightbulb, AlertTriangle, ArrowUpCircle, XCircle, FlaskConical, Wheat, Shield, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '기지 건설 순서 가이드 | KLZ Guide' : 'Hướng dẫn Thứ tự Xây dựng Căn cứ | KLZ Guide',
    description: locale === 'ko'
      ? '기지 건설 순서 완벽 가이드 - 건물 우선순위, 스킵할 건물, HQ 중심 전략'
      : 'Hướng dẫn hoàn chỉnh thứ tự xây dựng căn cứ - ưu tiên tòa nhà, tòa bỏ qua, chiến lược HQ',
  };
}

export default async function BaseBuildingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BaseBuildingContent locale={locale} />;
}

function BaseBuildingContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const buildingPriority = [
    {
      rank: 1,
      name: isKorean ? '본부 (HQ)' : 'HQ (Trụ sở)',
      reason: isKorean ? '모든 건물의 레벨 상한을 결정. 항상 최우선 업그레이드' : 'Quyết định giới hạn level tất cả tòa nhà. Luôn nâng cấp đầu tiên',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      icon: Building2,
      detail: isKorean
        ? 'HQ 레벨이 높아야 다른 건물도 업그레이드할 수 있습니다. 자원이 모이면 무조건 HQ부터 올리세요.'
        : 'HQ level cao mới nâng cấp được tòa nhà khác. Khi có tài nguyên luôn nâng HQ trước.',
    },
    {
      rank: 2,
      name: isKorean ? '병원' : 'Bệnh viện (Hospital)',
      reason: isKorean ? '부상 병력 치료 용량 확보. PvP 손실 최소화의 핵심' : 'Đảm bảo dung lượng chữa trị. Chìa khóa giảm thiểu tổn thất PvP',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      icon: Shield,
      detail: isKorean
        ? '병원 용량이 부족하면 전투에서 부상당한 병력이 사망합니다. 최소 총 병력의 60% 이상을 수용할 수 있어야 합니다.'
        : 'Thiếu dung lượng bệnh viện thì quân bị thương sẽ chết. Cần chứa được ít nhất 60% tổng quân.',
    },
    {
      rank: 3,
      name: isKorean ? '훈련소' : 'Trại huấn luyện (Training Camp)',
      reason: isKorean ? '더 높은 레벨의 병력 훈련 해금. 전투력 직결' : 'Mở khóa huấn luyện quân cấp cao hơn. Liên quan trực tiếp CP',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      icon: Shield,
      detail: isKorean
        ? '훈련소 레벨이 높을수록 강한 병력을 훈련할 수 있습니다. HQ 업그레이드 직후 바로 올려야 합니다.'
        : 'Training Camp level cao hơn huấn luyện được quân mạnh hơn. Nâng ngay sau khi nâng HQ.',
    },
    {
      rank: 4,
      name: isKorean ? '연구소' : 'Phòng nghiên cứu (Research Lab)',
      reason: isKorean ? '기술 연구 해금 및 가속. 장기 성장의 근본' : 'Mở khóa và tăng tốc nghiên cứu. Nền tảng phát triển dài hạn',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      icon: FlaskConical,
      detail: isKorean
        ? '연구소는 1개만 있으면 됩니다. 여러 개 건설은 자원 낭비입니다. 레벨업으로 더 높은 기술을 해금하세요.'
        : 'Chỉ cần 1 phòng NC. Xây nhiều là lãng phí. Nâng level để mở khóa công nghệ cao hơn.',
    },
    {
      rank: 5,
      name: isKorean ? '성벽' : 'Tường thành (Walls)',
      reason: isKorean ? '방어력 증가. HQ 업그레이드 요구 조건이기도 함' : 'Tăng phòng thủ. Cũng là điều kiện nâng HQ',
      color: 'text-gray-400',
      bg: 'bg-gray-500/10',
      icon: Shield,
      detail: isKorean
        ? '성벽은 HQ 업그레이드의 전제 조건인 경우가 많습니다. 미리미리 올려두세요.'
        : 'Tường thường là điều kiện tiên quyết nâng HQ. Hãy nâng trước.',
    },
    {
      rank: 6,
      name: isKorean ? '자원 건물' : 'Tòa nhà tài nguyên',
      reason: isKorean ? '패시브 자원 생산. 초반에는 중요하지만 후반에는 비중 감소' : 'Sản xuất tài nguyên thụ động. Quan trọng đầu game nhưng giảm dần',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      icon: Wheat,
      detail: isKorean
        ? '자원 건물은 균형 있게 올리되, HQ/병원/훈련소보다 우선하지 마세요.'
        : 'Nâng tòa tài nguyên cân bằng nhưng đừng ưu tiên hơn HQ/Bệnh viện/Trại HL.',
    },
  ];

  const buildingsToSkip = [
    {
      name: isKorean ? '장식물/꾸미기 건물' : 'Trang trí/Đồ trang trí',
      reason: isKorean ? '전투력/성장에 기여하지 않음. 자원 낭비' : 'Không đóng góp CP/phát triển. Lãng phí tài nguyên',
    },
    {
      name: isKorean ? '추가 자원 건물 (과도한 수)' : 'Thêm tòa tài nguyên (quá nhiều)',
      reason: isKorean ? '3-4개 이상은 비효율적. 다른 건물에 슬롯을 사용하세요' : 'Hơn 3-4 cái không hiệu quả. Dùng slot cho tòa nhà khác',
    },
    {
      name: isKorean ? '필요 없는 건물 레벨업' : 'Nâng level tòa không cần thiết',
      reason: isKorean ? 'HQ 요구 조건이 아닌 건물은 나중에 올려도 됩니다' : 'Tòa không phải điều kiện HQ thì nâng sau cũng được',
    },
  ];

  const hqStrategy = [
    isKorean
      ? 'HQ는 항상 최우선입니다. 다른 건물이 필요하더라도 HQ 자원은 따로 비축하세요.'
      : 'HQ luôn là ưu tiên số 1. Dù cần tòa khác, hãy dự trữ tài nguyên cho HQ.',
    isKorean
      ? 'HQ 업그레이드 전에 전제 조건 건물(성벽 등)을 미리 올려두세요.'
      : 'Nâng các tòa điều kiện (tường, v.v.) trước khi nâng HQ.',
    isKorean
      ? 'HQ 레벨이 오르면 바로 훈련소와 연구소를 업그레이드하세요.'
      : 'Khi HQ lên level, nâng ngay Trại HL và Phòng NC.',
    isKorean
      ? '가속 아이템은 HQ 건설에 우선 사용하세요.'
      : 'Ưu tiên dùng tăng tốc cho xây HQ.',
  ];

  const labTiming = [
    {
      phase: isKorean ? '초반 (HQ 1-10)' : 'Đầu game (HQ 1-10)',
      labs: '1',
      reason: isKorean ? '연구소 1개면 충분. 다른 건물에 집중' : '1 phòng NC đủ. Tập trung tòa khác',
      color: 'text-green-400',
    },
    {
      phase: isKorean ? '중반 (HQ 11-20)' : 'Giữa game (HQ 11-20)',
      labs: '1',
      reason: isKorean ? '여전히 1개. 레벨업에 집중하여 고급 기술 해금' : 'Vẫn 1 cái. Tập trung nâng level mở khóa CN cao',
      color: 'text-blue-400',
    },
    {
      phase: isKorean ? '후반 (HQ 21+)' : 'Cuối game (HQ 21+)',
      labs: '1',
      reason: isKorean ? '연구소는 항상 1개입니다. 여러 개 건설 불가' : 'Phòng NC luôn 1 cái. Không xây được nhiều',
      color: 'text-purple-400',
    },
  ];

  const resourceStrategy = [
    isKorean
      ? '각 자원 건물을 균등하게 업그레이드하세요 - 특정 자원만 올리면 병목이 생깁니다'
      : 'Nâng cấp đều các tòa tài nguyên - chỉ nâng một loại sẽ bị tắc nghẽn',
    isKorean
      ? '자원 건물보다 파밍(좀비 처치, 자원 타일 채집)이 후반에는 더 효율적입니다'
      : 'Farming (kill zombie, thu thập tile) hiệu quả hơn tòa tài nguyên ở cuối game',
    isKorean
      ? '자원이 넘치면 바로 사용하세요 - 약탈당할 수 있습니다'
      : 'Khi tài nguyên dư hãy dùng ngay - có thể bị cướp',
    isKorean
      ? '자원 보호 창고를 업그레이드하면 약탈 손실을 줄일 수 있습니다'
      : 'Nâng cấp kho bảo vệ tài nguyên giảm thiệt hại khi bị cướp',
  ];

  const tips = [
    isKorean
      ? 'HQ 업그레이드는 게임 내 가장 중요한 행동입니다. 자원이 모이면 무조건 HQ!'
      : 'Nâng HQ là hành động quan trọng nhất trong game. Khi có tài nguyên luôn nâng HQ!',
    isKorean
      ? '병원 용량 확보를 소홀히 하면 PvP에서 병력을 잃게 됩니다'
      : 'Bỏ quên dung lượng bệnh viện sẽ mất quân trong PvP',
    isKorean
      ? '건설 큐를 비워두지 마세요 - 항상 무언가를 건설 중이어야 합니다'
      : 'Đừng để trống hàng đợi xây - luôn phải xây gì đó',
    isKorean
      ? '무료 건설 가속(5분 이하)을 매번 활용하세요'
      : 'Luôn tận dụng tăng tốc xây miễn phí (dưới 5 phút)',
    isKorean
      ? '전면전비 건물 업그레이드 테마 때 가속 아이템을 사용하면 이벤트 포인트도 획득할 수 있습니다'
      : 'Dùng tăng tốc khi theme xây Full Prep để nhận điểm event',
    isKorean
      ? 'HQ 업그레이드 상세 비용은 HQ 업그레이드 가이드를 참고하세요'
      : 'Chi phí chi tiết nâng HQ xem ở hướng dẫn Nâng cấp Trụ sở',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.beginner')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-highlight" />
            {isKorean ? '기지 건설 순서 가이드' : 'Hướng dẫn Thứ tự Xây dựng Căn cứ'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '효율적인 건설 순서를 따르면 같은 자원으로 더 빠르게 성장할 수 있습니다. HQ 중심의 건설 전략을 알아봅시다.'
              : 'Theo thứ tự xây dựng hiệu quả sẽ phát triển nhanh hơn với cùng tài nguyên. Tìm hiểu chiến lược xây dựng tập trung HQ.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '건설 우선순위: HQ > 병원 > 훈련소 > 연구소 > 성벽 > 자원 건물' : 'Ưu tiên: HQ > Bệnh viện > Trại HL > Phòng NC > Tường > Tòa tài nguyên'}</li>
              <li>• {isKorean ? 'HQ는 항상 최우선 - 다른 모든 건물의 레벨 상한을 결정' : 'HQ luôn ưu tiên số 1 - quyết định giới hạn level tất cả tòa'}</li>
              <li>• {isKorean ? '연구소는 1개면 충분 - 레벨업에 집중' : 'Phòng NC 1 cái đủ - tập trung nâng level'}</li>
              <li>• {isKorean ? '장식/불필요한 건물은 건너뛰기' : 'Bỏ qua trang trí/tòa không cần thiết'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Building Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ArrowUpCircle className="h-6 w-6 text-highlight" />
            {isKorean ? '건물 우선순위' : 'Ưu tiên tòa nhà'}
          </h2>
          <div className="space-y-4">
            {buildingPriority.map((building) => {
              const Icon = building.icon;
              return (
                <Card key={building.rank} className={`${building.bg} border-none`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-lg">
                        {building.rank}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-5 w-5 ${building.color}`} />
                          <span className={`font-bold text-lg ${building.color}`}>{building.name}</span>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{building.reason}</p>
                        <p className="text-xs text-muted-foreground">{building.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Buildings to Skip */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-400" />
            {isKorean ? '건너뛸 건물 / 후순위' : 'Tòa nhà bỏ qua / Ưu tiên sau'}
          </h2>
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="p-4">
              <div className="space-y-4">
                {buildingsToSkip.map((building, idx) => (
                  <div key={idx} className="flex gap-3">
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-destructive">{building.name}</p>
                      <p className="text-xs text-muted-foreground">{building.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* HQ-Centric Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-yellow-400" />
            {isKorean ? 'HQ 중심 전략' : 'Chiến lược tập trung HQ'}
          </h2>
          <Card className="border-highlight/30 bg-highlight/5">
            <CardContent className="p-4">
              <ol className="space-y-3">
                {hqStrategy.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Lab Timing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-purple-400" />
            {isKorean ? '연구소 타이밍' : 'Thời điểm Phòng NC'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {labTiming.map((phase, idx) => (
                  <div key={idx} className="text-center p-4 rounded-lg bg-muted/30">
                    <p className={`text-sm font-medium ${phase.color} mb-1`}>{phase.phase}</p>
                    <p className={`text-3xl font-bold ${phase.color}`}>{phase.labs}</p>
                    <p className="text-xs text-muted-foreground mt-1">{isKorean ? '연구소' : 'Phòng NC'}</p>
                    <p className="text-xs text-muted-foreground mt-2">{phase.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resource Building Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wheat className="h-6 w-6 text-green-400" />
            {isKorean ? '자원 건물 전략' : 'Chiến lược tòa tài nguyên'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {resourceStrategy.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Link to HQ Guide */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <LinkIcon className="h-6 w-6 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-blue-400 mb-1">
                  {isKorean ? 'HQ 업그레이드 가이드' : 'Hướng dẫn Nâng cấp HQ'}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {isKorean
                    ? 'HQ 레벨별 업그레이드 비용과 해금 콘텐츠를 확인하세요.'
                    : 'Xem chi phí nâng cấp và nội dung mở khóa theo level HQ.'}
                </p>
                <Link
                  href={`/${locale}/progression/hq`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                  {isKorean ? 'HQ 가이드 보기' : 'Xem hướng dẫn HQ'}
                  <ArrowUpCircle className="h-4 w-4" />
                </Link>
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
                  {isKorean ? '초보자 흔한 실수' : 'Sai lầm thường gặp của người mới'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? 'HQ를 뒤로 미루고 다른 건물만 올리기 - 성장 병목의 원인' : 'Trì hoãn HQ mà nâng tòa khác - nguyên nhân tắc nghẽn phát triển'}</li>
                  <li>• {isKorean ? '병원 용량 무시 - PvP에서 병력 영구 손실' : 'Bỏ qua dung lượng bệnh viện - mất quân vĩnh viễn trong PvP'}</li>
                  <li>• {isKorean ? '자원 건물에 과투자 - 후반에는 파밍이 더 효율적' : 'Đầu tư quá vào tòa tài nguyên - cuối game farming hiệu quả hơn'}</li>
                  <li>• {isKorean ? '건설 큐를 비워두기 - 시간 낭비' : 'Để trống hàng đợi xây - lãng phí thời gian'}</li>
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
