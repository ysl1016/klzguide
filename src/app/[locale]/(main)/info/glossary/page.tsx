import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, BookOpen } from 'lucide-react';

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GlossaryContent locale={locale} />;
}

function GlossaryContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const glossaryTerms = [
    // 기본 용어
    {
      term: isKorean ? '본부 (HQ)' : 'HQ (Headquarters)',
      ko: '본부',
      en: 'Headquarters',
      vi: 'Trụ sở chính',
      definition: isKorean
        ? '메인 건물. 다른 모든 건물의 최대 레벨을 결정'
        : 'Công trình chính. Quyết định level tối đa của mọi công trình khác',
    },
    {
      term: isKorean ? '전투력 (CP)' : 'CP (Combat Power)',
      ko: '전투력',
      en: 'Combat Power',
      vi: 'Sức mạnh chiến đấu',
      definition: isKorean
        ? '계정의 총 전투력. 건물/기술/병력/영웅/차량 파워의 합'
        : 'Tổng sức mạnh tài khoản. Tổng của công trình/công nghệ/quân/anh hùng/xe',
    },
    {
      term: isKorean ? '무과금 (F2P)' : 'F2P (Free to Play)',
      ko: '무과금',
      en: 'Free to Play',
      vi: 'Chơi miễn phí',
      definition: isKorean
        ? '현금 결제 없이 플레이하는 방식'
        : 'Cách chơi không nạp tiền',
    },
    {
      term: isKorean ? '연맹 인정 (AR)' : 'AR (Alliance Recognition)',
      ko: '연맹 인정',
      en: 'Alliance Recognition',
      vi: 'Alliance Recognition',
      definition: isKorean
        ? '일일 보상을 2배로 증가시키는 핵심 연구'
        : 'NC cốt lõi tăng gấp đôi phần thưởng hàng ngày',
    },
    // 이벤트
    {
      term: isKorean ? '서버 대전 (SVS)' : 'SVS (Server vs Server)',
      ko: '서버 대전',
      en: 'Server vs Server',
      vi: 'Server vs Server',
      definition: isKorean
        ? '서버 간 대규모 전투 이벤트'
        : 'Sự kiện chiến đấu lớn giữa các server',
    },
    {
      term: isKorean ? '랠리' : 'Rally',
      ko: '랠리',
      en: 'Rally',
      vi: 'Rally',
      definition: isKorean
        ? '연맹원들이 함께 공격하는 집단 공격'
        : 'Tấn công tập thể cùng thành viên liên minh',
    },
    {
      term: isKorean ? '난폭 두목' : 'Furylord',
      ko: '난폭 두목',
      en: 'Furylord',
      vi: 'Furylord',
      definition: isKorean
        ? '일일 보스. 4회/일 (00/06/12/18시), 일요일 제외'
        : 'Boss hàng ngày. 4 lần/ngày (00/06/12/18h), trừ CN',
    },
    {
      term: isKorean ? '전면전비' : 'Full Preparedness',
      ko: '전면전비',
      en: 'Full Preparedness',
      vi: 'Full Preparedness',
      definition: isKorean
        ? '일일 이벤트. 4시간마다 5개 테마가 순환 (건물, 연구, 차량, 영웅, 훈련)'
        : 'Sự kiện hàng ngày. 5 theme xoay vòng mỗi 4 tiếng (Xây, NC, Xe, Anh hùng, HL)',
    },
    {
      term: isKorean ? '좀비폭군' : 'Tyrant',
      ko: '좀비폭군',
      en: 'Tyrant',
      vi: 'Tyrant',
      definition: isKorean
        ? '연맹 랠리 보스. Steel 획득의 주요 이벤트'
        : 'Boss rally liên minh. Sự kiện chính để farm Steel',
    },
    {
      term: isKorean ? '좀비 포위전' : 'Zombie Siege',
      ko: '좀비 포위전',
      en: 'Zombie Siege',
      vi: 'Zombie Siege',
      definition: isKorean
        ? '연맹 방어 이벤트. 30웨이브, 렌치 보상'
        : 'Sự kiện phòng thủ liên minh. 30 wave, thưởng Wrench',
    },
    {
      term: isKorean ? '연맹 대결' : 'Alliance Duel',
      ko: '연맹 대결',
      en: 'Alliance Duel',
      vi: 'Alliance Duel',
      definition: isKorean
        ? '연맹 간 경쟁 이벤트. 렌치 획득처'
        : 'Sự kiện cạnh tranh giữa các liên minh. Nguồn farm Wrench',
    },
    // 진영
    {
      term: isKorean ? '새벽의 날개' : 'Dawn Wings',
      ko: '새벽의 날개',
      en: 'Dawn Wings',
      vi: 'Cánh Bình Minh',
      definition: isKorean
        ? '세 진영 중 하나. 블러디 로즈에 강함. 슈터 특화'
        : 'Một trong 3 phe. Mạnh chống Blood Rose. Chuyên Shooter',
    },
    {
      term: isKorean ? '블러디 로즈' : 'Blood Rose',
      ko: '블러디 로즈',
      en: 'Blood Rose',
      vi: 'Blood Rose',
      definition: isKorean
        ? '세 진영 중 하나. 질서의 수호자에 강함. 돌격 특화'
        : 'Một trong 3 phe. Mạnh chống Người Bảo Vệ Trật Tự. Chuyên Assaulter',
    },
    {
      term: isKorean ? '질서의 수호자' : 'Order Keepers',
      ko: '질서의 수호자',
      en: 'Order Keepers',
      vi: 'Người Bảo Vệ Trật Tự',
      definition: isKorean
        ? '세 진영 중 하나. 새벽의 날개에 강함. 라이더 특화'
        : 'Một trong 3 phe. Mạnh chống Cánh Bình Minh. Chuyên Rider',
    },
    // 병종
    {
      term: isKorean ? '돌격병' : 'Assaulter',
      ko: '돌격병',
      en: 'Assaulter',
      vi: 'Assaulter',
      definition: isKorean
        ? '병종. 높은 공격력, 낮은 방어력. 슈터에 강함'
        : 'Loại quân. ATK cao, DEF thấp. Mạnh chống Shooter',
    },
    {
      term: isKorean ? '슈터' : 'Shooter',
      ko: '슈터',
      en: 'Shooter',
      vi: 'Shooter',
      definition: isKorean
        ? '병종. 균형 잡힌 스탯. 라이더에 강함'
        : 'Loại quân. Stat cân bằng. Mạnh chống Rider',
    },
    {
      term: isKorean ? '라이더' : 'Rider',
      ko: '라이더',
      en: 'Rider',
      vi: 'Rider',
      definition: isKorean
        ? '병종. 높은 HP/방어력, 낮은 공격력. 돌격병에 강함'
        : 'Loại quân. HP/DEF cao, ATK thấp. Mạnh chống Assaulter',
    },
    // 장비/재화
    {
      term: isKorean ? '에너지코어' : 'Power Core',
      ko: '에너지코어',
      en: 'Power Core',
      vi: 'Power Core',
      definition: isKorean
        ? '오렌지 장비 승급(헥사곤)에 필요한 재화'
        : 'Tiền tệ cần để thăng cấp (hexagon) trang bị cam',
    },
    {
      term: isKorean ? '헥사곤' : 'Hexagon',
      ko: '헥사곤',
      en: 'Hexagon',
      vi: 'Hexagon',
      definition: isKorean
        ? '장비 성급 시스템. 에너지코어로 업그레이드'
        : 'Hệ thống sao trang bị. Nâng bằng Power Core',
    },
    {
      term: isKorean ? '강화 합금' : 'Enhancement Alloy',
      ko: '강화 합금',
      en: 'Enhancement Alloy',
      vi: 'Enhancement Alloy',
      definition: isKorean
        ? '장비 레벨업에 필요한 재화'
        : 'Tiền tệ cần để lên level trang bị',
    },
    {
      term: isKorean ? '발로 메달' : 'Valor Medals',
      ko: '발로 메달',
      en: 'Valor Medals',
      vi: 'Valor Medals',
      definition: isKorean
        ? 'SVS 보상. 블랙마켓에서 오렌지 장비 교환 가능'
        : 'Thưởng SVS. Có thể đổi trang bị cam ở Black Market',
    },
    {
      term: isKorean ? '렌치' : 'Wrench',
      ko: '렌치',
      en: 'Wrench',
      vi: 'Wrench',
      definition: isKorean
        ? '차량 개조에 필요한 재화. 연맹 대결/좀비 포위전에서 획득'
        : 'Tiền tệ để mod xe. Farm từ Alliance Duel/Zombie Siege',
    },
    {
      term: isKorean ? '골든 렌치' : 'Golden Wrench',
      ko: '골든 렌치',
      en: 'Golden Wrench',
      vi: 'Golden Wrench',
      definition: isKorean
        ? '프리미엄 차량 개조 재화. 가챠 고에서 획득'
        : 'Tiền tệ mod xe cao cấp. Farm từ Gacha Go',
    },
    {
      term: isKorean ? '스틸' : 'Steel',
      ko: '스틸',
      en: 'Steel',
      vi: 'Steel',
      definition: isKorean
        ? 'HQ 31+ 건설에 필요한 재화. 좀비폭군에서 획득'
        : 'Tiền tệ xây HQ 31+. Farm từ Tyrant',
    },
    // 상점
    {
      term: isKorean ? '공훈상점' : 'Merit Shop',
      ko: '공훈상점',
      en: 'Merit Shop',
      vi: 'Merit Shop',
      definition: isKorean
        ? '연맹 활동으로 얻은 공훈으로 아이템 구매하는 상점'
        : 'Shop mua đồ bằng Merit từ hoạt động liên minh',
    },
    {
      term: isKorean ? '특권상점' : 'VIP Shop',
      ko: '특권상점',
      en: 'VIP Shop',
      vi: 'VIP Shop',
      definition: isKorean
        ? 'VIP 레벨에 따라 이용 가능한 프리미엄 상점'
        : 'Shop cao cấp theo level VIP',
    },
    {
      term: isKorean ? '블랙마켓' : 'Black Market',
      ko: '블랙마켓',
      en: 'Black Market',
      vi: 'Black Market',
      definition: isKorean
        ? '발로 메달로 오렌지 장비를 구매하는 상점'
        : 'Shop mua trang bị cam bằng Valor Medals',
    },
    // 기타
    {
      term: isKorean ? '크립' : 'Creep',
      ko: '크립',
      en: 'Creep',
      vi: 'Creep',
      definition: isKorean
        ? '월드맵의 좀비 몬스터. 자원과 경험치 획득'
        : 'Zombie trên bản đồ. Cho tài nguyên và EXP',
    },
    {
      term: isKorean ? '쉴드 (보호막)' : 'Shield',
      ko: '쉴드',
      en: 'Shield',
      vi: 'Shield',
      definition: isKorean
        ? '공격으로부터 기지를 보호하는 아이템'
        : 'Item bảo vệ căn cứ khỏi tấn công',
    },
    {
      term: isKorean ? '파밍' : 'Farming',
      ko: '파밍',
      en: 'Farming',
      vi: 'Farming',
      definition: isKorean
        ? '자원이나 아이템을 반복적으로 수집하는 행위'
        : 'Hành động thu thập tài nguyên/item lặp đi lặp lại',
    },
  ];

  // Sort alphabetically
  const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              5 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-highlight" />
            {isKorean ? '용어 사전' : 'Từ điển thuật ngữ'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '게임에서 자주 사용되는 용어들을 정리했습니다.'
              : 'Tổng hợp các thuật ngữ thường dùng trong game.'}
          </p>
        </div>

        {/* Glossary List */}
        <div className="space-y-3">
          {sortedTerms.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <div className="sm:w-1/3">
                    <p className="font-semibold text-highlight">{item.term}</p>
                    <p className="text-sm text-muted-foreground">
                      {isKorean ? item.en : item.ko}
                    </p>
                  </div>
                  <p className="sm:w-2/3 text-sm text-muted-foreground">
                    {item.definition}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
