import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Swords, Shield, Target, Eye, Lightbulb, AlertTriangle, Search, Timer } from 'lucide-react';

export default async function PvPStrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PvPStrategyContent locale={locale} />;
}

function PvPStrategyContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const attackStrategies = [
    {
      name: isKorean ? '정찰 먼저' : 'Trinh sát trước',
      description: isKorean
        ? '공격 전 반드시 정찰. 상대 진영/병력/영웅 확인 후 카운터 구성'
        : 'Bắt buộc trinh sát trước khi tấn công. Kiểm tra phe/quân/anh hùng đối thủ rồi cấu thành counter',
    },
    {
      name: isKorean ? '가짜 랠리' : 'Rally giả',
      description: isKorean
        ? '진짜 공격 전 가짜 랠리로 상대 방어 유도 후 취소, 자원 낭비 유도'
        : 'Rally giả trước tấn công thật để dụ phòng thủ rồi hủy, khiến đối thủ lãng phí tài nguyên',
    },
    {
      name: isKorean ? '다중 랠리' : 'Rally đa điểm',
      description: isKorean
        ? '여러 타겟에 동시 랠리로 상대 방어 분산'
        : 'Rally đồng thời nhiều mục tiêu để phân tán phòng thủ đối thủ',
    },
    {
      name: isKorean ? '타이밍 공격' : 'Tấn công đúng thời điểm',
      description: isKorean
        ? '상대 쉴드 끝나는 시간, 비활성 시간대 노려 공격'
        : 'Tấn công khi shield đối thủ hết, vào giờ không hoạt động',
    },
  ];

  const defenseStrategies = [
    {
      name: isKorean ? '쉴드 관리' : 'Quản lý Shield',
      description: isKorean
        ? '오프라인 시 반드시 쉴드. 무과금도 8시간 쉴드는 자주 사용 가능'
        : 'Bắt buộc shield khi offline. F2P cũng có thể dùng shield 8 giờ thường xuyên',
    },
    {
      name: isKorean ? '병력 대피' : 'Sơ tán quân',
      description: isKorean
        ? '대규모 공격 예상 시 병력을 연맹 요새나 자원 타일로 대피'
        : 'Khi dự đoán tấn công lớn, sơ tán quân sang pháo đài liên minh hoặc ô tài nguyên',
    },
    {
      name: isKorean ? '방어 진형 전환' : 'Chuyển đội hình phòng thủ',
      description: isKorean
        ? '공격 감지 시 방어 특화 진형으로 빠르게 전환'
        : 'Khi phát hiện tấn công, nhanh chóng chuyển sang đội hình phòng thủ chuyên biệt',
    },
    {
      name: isKorean ? '연맹 지원 요청' : 'Yêu cầu hỗ trợ liên minh',
      description: isKorean
        ? '대규모 랠리 시 연맹원 지원병 요청'
        : 'Yêu cầu quân hỗ trợ từ thành viên liên minh khi bị rally lớn',
    },
  ];

  const battleTips = [
    {
      icon: Eye,
      title: isKorean ? '전장 인식' : 'Nhận thức chiến trường',
      tip: isKorean
        ? '적 움직임 항상 모니터링. 랠리 타이머, 행군 방향 주시'
        : 'Luôn theo dõi di chuyển của địch. Chú ý timer rally, hướng hành quân',
    },
    {
      icon: Target,
      title: isKorean ? '우선순위 타겟' : 'Mục tiêu ưu tiên',
      tip: isKorean
        ? '전력이 약한 적부터 제거하여 수적 우위 확보'
        : 'Loại bỏ địch yếu trước để có lợi thế số lượng',
    },
    {
      icon: Shield,
      title: isKorean ? '자원 보호' : 'Bảo vệ tài nguyên',
      tip: isKorean
        ? '전투 전 자원 모두 사용하거나 창고 용량 내로 유지'
        : 'Trước chiến đấu, dùng hết tài nguyên hoặc giữ trong dung lượng kho',
    },
  ];

  const commonMistakes = [
    isKorean ? '정찰 없이 공격 → 카운터 당함' : 'Tấn công không trinh sát → bị counter',
    isKorean ? '오프라인 시 쉴드 미사용 → 병력 손실' : 'Không shield khi offline → mất quân',
    isKorean ? '단독 행동 → 연맹 지원 없이 고립' : 'Hành động đơn độc → bị cô lập không hỗ trợ',
    isKorean ? '저티어 다수 병력 사용 → 쉽게 격파당함' : 'Dùng nhiều quân tier thấp → dễ bị đánh bại',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-advanced">
              {t('difficulty.advanced')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Swords className="h-8 w-8 text-highlight" />
            {isKorean ? 'PvP 전략 가이드' : 'Hướng dẫn chiến thuật PvP'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '공격/방어 전략과 전투 팁을 알아봅니다.'
              : 'Tìm hiểu chiến thuật tấn công/phòng thủ và mẹo chiến đấu.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '공격 전 반드시 정찰 → 카운터 구성' : 'Bắt buộc trinh sát trước tấn công → cấu thành counter'}</li>
              <li>• {isKorean ? '오프라인 시 반드시 쉴드 사용' : 'Bắt buộc dùng shield khi offline'}</li>
              <li>• {isKorean ? '연맹과 협력 - 단독 행동 금지' : 'Hợp tác với liên minh - cấm hành động đơn độc'}</li>
              <li>• {isKorean ? '전투 전 자원 보호 (사용 또는 창고 내)' : 'Bảo vệ tài nguyên trước chiến đấu'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Attack Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Swords className="h-6 w-6 text-red-400" />
            {isKorean ? '공격 전략' : 'Chiến thuật tấn công'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {attackStrategies.map((strategy, idx) => (
              <Card key={idx} className="bg-red-500/5 border-red-500/20">
                <CardContent className="p-4">
                  <p className="font-semibold text-red-400 mb-1">{strategy.name}</p>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Defense Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            {isKorean ? '방어 전략' : 'Chiến thuật phòng thủ'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {defenseStrategies.map((strategy, idx) => (
              <Card key={idx} className="bg-blue-500/5 border-blue-500/20">
                <CardContent className="p-4">
                  <p className="font-semibold text-blue-400 mb-1">{strategy.name}</p>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Battle Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '전투 팁' : 'Mẹo chiến đấu'}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {battleTips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <Icon className="h-6 w-6 text-highlight mb-2" />
                    <p className="font-semibold mb-1">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            {isKorean ? '흔한 실수' : 'Sai lầm thường gặp'}
          </h2>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 space-y-2">
              {commonMistakes.map((mistake, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-destructive">✗</span>
                  <span className="text-sm text-muted-foreground">{mistake}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Faction Counter Triangle */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Swords className="h-6 w-6 text-highlight" />
            {isKorean ? '진영 상성 시스템' : 'He thong tuong khac phe'}
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm px-3 py-1">
                    {isKorean ? '슈터 (새벽의 날개)' : 'Shooter (Canh Binh Minh)'}
                  </Badge>
                  <span className="text-green-400 font-bold text-lg">&rarr;</span>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-sm px-3 py-1">
                    {isKorean ? '돌격 (블러디 로즈)' : 'Assaulter (Blood Rose)'}
                  </Badge>
                  <span className="text-green-400 font-bold text-lg">&rarr;</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-sm px-3 py-1">
                    {isKorean ? '라이더 (질서의 수호자)' : 'Rider (Nguoi Bao Ve Trat Tu)'}
                  </Badge>
                  <span className="text-green-400 font-bold text-lg">&rarr;</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm px-3 py-1">
                    {isKorean ? '슈터' : 'Shooter'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {isKorean
                    ? '화살표 방향이 카운터 관계입니다. 슈터는 돌격을, 돌격은 라이더를, 라이더는 슈터를 이깁니다.'
                    : 'Huong mui ten la quan he counter. Shooter thang Assaulter, Assaulter thang Rider, Rider thang Shooter.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommended Composition */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-highlight" />
            {isKorean ? '추천 구성' : 'Cau hinh khuyen nghi'}
          </h2>
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {isKorean ? '최적 조합' : 'To hop toi uu'}
                </Badge>
              </div>
              <p className="text-sm">
                {isKorean
                  ? '새벽의 날개(슈터) 3명 + 블러디 로즈(돌격) 2명 하이브리드 구성이 최적입니다.'
                  : 'Ket hop 3 Canh Binh Minh (Shooter) + 2 Blood Rose (Assaulter) la toi uu.'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isKorean
                  ? '이유: 대부분의 서버에서 블러디 로즈 유저가 다수이므로 슈터 위주 구성이 카운터 이점을 가집니다.'
                  : 'Ly do: Da so server co nhieu Blood Rose nen doi hinh Shooter co loi the counter.'}
              </p>
            </CardContent>
          </Card>
          <div className="info-warning flex gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '칩은 진영 고정이므로 변경 비용이 매우 높습니다. 메인 진영을 신중하게 결정한 후 칩을 투자하세요.'
                : 'Chip co dinh theo phe nen chi phi thay doi rat cao. Hay can nhac ky truoc khi dau tu chip vao phe chinh.'}
            </p>
          </div>
        </section>

        {/* Scout Protocol */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Search className="h-6 w-6 text-highlight" />
            {isKorean ? '정찰 프로토콜' : 'Quy trinh trinh sat'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                {isKorean
                  ? '공격 전 반드시 다음 항목을 확인하세요:'
                  : 'Bat buoc kiem tra cac muc sau truoc khi tan cong:'}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Eye className="h-4 w-4 text-highlight shrink-0 mt-0.5" />
                  <span>
                    {isKorean
                      ? '킬수 vs 파워 비교: 높은 파워 + 낮은 킬수 = 건물/연구로 부풀린 파워 (쉬운 타겟)'
                      : 'So sanh Kill vs Power: Power cao + Kill thap = Power thoi phong tu cong trinh/NC (muc tieu de)'}
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Eye className="h-4 w-4 text-highlight shrink-0 mt-0.5" />
                  <span>{isKorean ? '영웅 파워 확인' : 'Kiem tra Power anh hung'}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Eye className="h-4 w-4 text-highlight shrink-0 mt-0.5" />
                  <span>{isKorean ? '차량 개조 파워 확인' : 'Kiem tra Power xe do'}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Eye className="h-4 w-4 text-highlight shrink-0 mt-0.5" />
                  <span>{isKorean ? '기술 연구 진행도 확인' : 'Kiem tra tien do nghien cuu ky thuat'}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Eye className="h-4 w-4 text-highlight shrink-0 mt-0.5" />
                  <span>{isKorean ? '연맹 소속 및 지원 가능성 확인' : 'Kiem tra lien minh va kha nang ho tro'}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Saturday Attack Timing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Timer className="h-6 w-6 text-highlight" />
            {isKorean ? '토요일 공격 타이밍' : 'Thoi diem tan cong thu Bay'}
          </h2>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="font-semibold text-destructive">
                  {isKorean ? '토요일 공격이 가장 효율적' : 'Tan cong thu Bay hieu qua nhat'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isKorean
                  ? '토요일에는 Enemy Buster + State Ruler 이벤트가 동시에 진행되어 병원 용량이 2배로 증가합니다.'
                  : 'Thu Bay co Enemy Buster + State Ruler dong thoi, dung luong benh vien tang gap 2.'}
              </p>
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm">
                  {isKorean
                    ? '각 LV25 병원: 3,480 슬롯 (토요일 2배 = 6,960 슬롯)'
                    : 'Moi benh vien LV25: 3.480 slot (thu Bay x2 = 6.960 slot)'}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {isKorean
                  ? '병원 용량 증가로 병력 손실 부담이 줄어들어, 적극적인 공격이 가능합니다. 또한 Enemy Buster 포인트와 State Ruler 포인트를 동시에 획득할 수 있습니다.'
                  : 'Dung luong benh vien tang giup giam mat quan, co the tan cong tich cuc hon. Dong thoi nhan diem Enemy Buster va State Ruler.'}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
