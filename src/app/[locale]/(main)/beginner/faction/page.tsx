import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Swords, Shield, Crosshair, Star, AlertTriangle, Info } from 'lucide-react';

export default async function FactionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FactionContent locale={locale} />;
}

function FactionContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // 실제 lastzguides.com 기반 진영 데이터
  const factions = [
    {
      name: isKorean ? '새벽의 날개' : 'Wings of Dawn',
      nameEn: 'Wings of Dawn',
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      icon: Crosshair,
      troopType: isKorean ? '슈터 (Shooter)' : 'Xạ thủ (Shooter)',
      style: isKorean ? '원거리 딜러' : 'Dealer tầm xa',
      description: isKorean
        ? '슈터 중심의 진영. 서버의 약 70%가 블러드 로즈를 선택하기 때문에, 새벽의 날개은 자연스러운 카운터 이점을 가집니다. 전략적으로 가장 추천되는 진영입니다.'
        : 'Phe tập trung vào Xạ thủ. Khoảng 70% server chọn Blood Rose, nên Wings of Dawn có lợi thế counter tự nhiên. Phe được khuyến nghị nhất về mặt chiến thuật.',
      pros: isKorean
        ? ['블러드 로즈(메타 진영)를 카운터', '원거리 DPS로 안정적', '대부분의 서버에서 유리']
        : ['Counter Blood Rose (phe meta)', 'DPS tầm xa ổn định', 'Có lợi ở hầu hết server'],
      cons: isKorean
        ? ['질서의 수호자에게 카운터 당함', '로라(Laura)가 유일한 프론트라인']
        : ['Bị counter bởi Guard of Order', 'Laura là frontline duy nhất'],
      recommended: isKorean ? '모든 플레이어 (가장 추천)' : 'Tất cả người chơi (Khuyến nghị nhất)',
      rating: 5,
      counterInfo: isKorean ? 'Blood Rose를 이김' : 'Thắng Blood Rose',
    },
    {
      name: isKorean ? '블러드 로즈' : 'Blood Rose',
      nameEn: 'Blood Rose',
      color: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
      icon: Swords,
      troopType: isKorean ? '돌격 (Assaulter)' : 'Lính đột kích (Assaulter)',
      style: isKorean ? '근접 돌격' : 'Đột kích cận chiến',
      description: isKorean
        ? '돌격 중심의 진영. 높은 데미지와 프론트라인 강점. 하지만 서버의 약 70%가 이 진영을 선택해서, PvP에서 새벽의 날개에게 카운터 당하는 경우가 많습니다.'
        : 'Phe tập trung vào Lính đột kích. Sát thương cao và frontline mạnh. Nhưng ~70% server chọn phe này, nên thường bị counter bởi Wings of Dawn trong PvP.',
      pros: isKorean
        ? ['질서의 수호자를 카운터', '높은 데미지 출력', '강력한 프론트라인 영웅들']
        : ['Counter Guard of Order', 'Sát thương cao', 'Các anh hùng frontline mạnh'],
      cons: isKorean
        ? ['새벽의 날개에게 카운터 당함', '가장 많이 선택되어 카운터 당하기 쉬움']
        : ['Bị counter bởi Wings of Dawn', 'Được chọn nhiều nhất nên dễ bị counter'],
      recommended: isKorean ? '근접 전투 선호자' : 'Người thích cận chiến',
      rating: 3,
      counterInfo: isKorean ? 'Guard of Order를 이김' : 'Thắng Guard of Order',
    },
    {
      name: isKorean ? '질서의 수호자' : 'Guard of Order',
      nameEn: 'Guard of Order',
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-500/10',
      icon: Shield,
      troopType: isKorean ? '라이더 (Rider)' : 'Kỵ binh (Rider)',
      style: isKorean ? '기동성 + 측면공격' : 'Cơ động + Tấn công sườn',
      description: isKorean
        ? '라이더 중심의 진영. 새벽의 날개을 카운터하지만, 서버에서 새벽의 날개 메타가 확산되지 않는 한 선택률이 낮습니다.'
        : 'Phe tập trung vào Kỵ binh. Counter Wings of Dawn, nhưng tỷ lệ chọn thấp trừ khi server có meta Wings of Dawn lan rộng.',
      pros: isKorean
        ? ['새벽의 날개을 카운터', '높은 기동성', '할리에나 등 강력한 탱크']
        : ['Counter Wings of Dawn', 'Cơ động cao', 'Tank mạnh như Harleyena'],
      cons: isKorean
        ? ['블러드 로즈에게 카운터 당함', '선택률이 낮아 카운터 상황이 적음']
        : ['Bị counter bởi Blood Rose', 'Ít được chọn nên ít cơ hội counter'],
      recommended: isKorean ? '새벽의 날개 메타 서버에서 추천' : 'Khuyến nghị ở server meta Wings of Dawn',
      rating: 3,
      counterInfo: isKorean ? 'Wings of Dawn을 이김' : 'Thắng Wings of Dawn',
    },
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-beginner">
              {t('difficulty.beginner')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              7 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold">
            {isKorean ? '진영 선택 가이드' : 'Hướng dẫn chọn phe phái'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '각 진영의 특징을 비교하고 자신에게 맞는 진영을 선택하세요.'
              : 'So sánh đặc điểm của từng phe phái và chọn phe phù hợp với bạn.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '새벽의 날개(슈터) 추천 - 서버 70%가 블러드 로즈라서 카운터 이점' : 'Wings of Dawn (Xạ thủ) được khuyến nghị - Counter 70% server chọn Blood Rose'}</li>
              <li>• {isKorean ? '상성: 윙즈 > 블러드 > 가드 > 윙즈 (가위바위보)' : 'Tương khắc: Wings > Blood > Guard > Wings (oẳn tù tì)'}</li>
              <li>• {isKorean ? '최적 조합: 윙즈 3명 + 블러드 2명 (크로스 시너지)' : 'Tổ hợp tối ưu: 3 Wings + 2 Blood (cross synergy)'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Counter System */}
        <Card className="border-highlight/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-highlight" />
              {isKorean ? '진영 상성 시스템' : 'Hệ thống tương khắc phe phái'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="text-blue-400 font-semibold">Wings of Dawn</span>
                <span className="text-muted-foreground">→ {isKorean ? '이김' : 'thắng'} →</span>
                <span className="text-red-400 font-semibold">Blood Rose</span>
                <span className="text-muted-foreground">→ {isKorean ? '이김' : 'thắng'} →</span>
                <span className="text-yellow-400 font-semibold">Guard of Order</span>
                <span className="text-muted-foreground">→ {isKorean ? '이김' : 'thắng'} →</span>
                <span className="text-blue-400 font-semibold">Wings...</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {isKorean
                  ? '슈터 > 돌격 > 라이더 > 슈터 (가위바위보 구조)'
                  : 'Xạ thủ > Đột kích > Kỵ binh > Xạ thủ (cấu trúc oẳn tù tì)'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Faction Cards */}
        <div className="space-y-6">
          {factions.map((faction) => {
            const Icon = faction.icon;
            return (
              <Card key={faction.nameEn} className={`border ${faction.borderColor}`}>
                <CardHeader className={`${faction.bgColor} rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-background ${faction.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className={faction.color}>{faction.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{faction.style}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < faction.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <p className="text-muted-foreground">{faction.description}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-tip mb-2">
                        {isKorean ? '장점' : 'Ưu điểm'}
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {faction.pros.map((pro, idx) => (
                          <li key={idx}>+ {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-destructive mb-2">
                        {isKorean ? '단점' : 'Nhược điểm'}
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {faction.cons.map((con, idx) => (
                          <li key={idx}>- {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${faction.bgColor}`}>
                    <span className="text-sm font-medium">
                      {isKorean ? '추천 대상: ' : 'Khuyến nghị cho: '}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {faction.recommended}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '진영 비교표' : 'Bảng so sánh phe phái'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">{isKorean ? '항목' : 'Hạng mục'}</th>
                  <th className="text-center p-3 text-blue-400">Wings of Dawn</th>
                  <th className="text-center p-3 text-red-400">Blood Rose</th>
                  <th className="text-center p-3 text-yellow-400">Guard of Order</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: isKorean ? '병종' : 'Binh chủng', values: [isKorean ? '슈터' : 'Xạ thủ', isKorean ? '돌격' : 'Đột kích', isKorean ? '라이더' : 'Kỵ binh'] },
                  { label: isKorean ? '카운터' : 'Counter', values: ['Blood Rose', 'Guard of Order', 'Wings of Dawn'] },
                  { label: isKorean ? '서버 점유율' : 'Tỷ lệ server', values: ['~20%', '~70%', '~10%'] },
                  { label: isKorean ? 'PvP 유리함' : 'PvP lợi thế', values: ['★★★★★', '★★★☆☆', '★★☆☆☆'] },
                  { label: isKorean ? '추천도' : 'Khuyến nghị', values: ['★★★★★', '★★★☆☆', '★★★☆☆'] },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="p-3 font-medium">{row.label}</td>
                    {row.values.map((val, idx) => (
                      <td key={idx} className="p-3 text-center text-muted-foreground">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Formation Recommendation */}
        <Card className="border-tip/30 bg-tip/5">
          <CardHeader>
            <CardTitle className="text-tip">
              {isKorean ? '추천 진형 조합' : 'Tổ hợp đội hình khuyến nghị'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {isKorean ? '최적' : 'Tối ưu'}
              </Badge>
              <span className="text-sm">
                {isKorean
                  ? 'Wings of Dawn 3명 + Blood Rose 2명 (카운터 이점 + 크로스 시즌 시너지)'
                  : '3 Wings of Dawn + 2 Blood Rose (lợi thế counter + synergy cross-season)'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-muted-foreground">
                {isKorean ? '대안' : 'Thay thế'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {isKorean
                  ? 'Guard of Order 3명 + Wings of Dawn 2명 (WoD 메타 서버용)'
                  : '3 Guard of Order + 2 Wings of Dawn (cho server meta WoD)'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <div className="info-warning flex gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning">
              {isKorean ? '주의: 단일 진영 조합' : 'Cảnh báo: Đội hình đơn phe'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '한 진영 영웅 5명만 쓰는 것은 위험합니다. 상대 진영에게 하드 카운터 당할 수 있습니다. 한 진영 S티어 5명이 모두 필요해서 현실적이지 않습니다.'
                : 'Dùng 5 anh hùng cùng phe là nguy hiểm. Có thể bị hard counter bởi phe đối lập. Cần 5 anh hùng S-tier cùng phe nên không thực tế.'}
            </p>
          </div>
        </div>

        {/* Final Recommendation */}
        <div className="info-tip">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-tip shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-tip">
                {isKorean ? '최종 추천' : 'Khuyến nghị cuối cùng'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isKorean
                  ? '새벽의 날개(슈터)을 메인 진영으로 선택하세요. 서버의 약 70%가 블러드 로즈를 선택하기 때문에 자연스러운 PvP 이점이 있습니다. 영웅은 진형에 맞춰 슈터 중심으로 키우되, 서브 영웅으로 블러드 로즈 돌격 2명을 추가하면 최적의 조합이 됩니다.'
                  : 'Chọn Wings of Dawn (Xạ thủ) làm phe chính. ~70% server chọn Blood Rose nên có lợi thế PvP tự nhiên. Nuôi anh hùng tập trung vào Xạ thủ, thêm 2 Lính đột kích Blood Rose làm phụ để có tổ hợp tối ưu.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
