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
    {
      term: 'HQ (Headquarters)',
      ko: '본부',
      vi: 'Trụ sở chính',
      definition: isKorean
        ? '본부. 다른 모든 건물의 최대 레벨을 결정'
        : 'Công trình chính. Quyết định level tối đa của mọi công trình khác',
    },
    {
      term: 'CP (Combat Power)',
      ko: '전투력',
      vi: 'Sức mạnh chiến đấu',
      definition: isKorean
        ? '계정의 총 전투력. 건물/기술/병력/영웅/차량 파워의 합'
        : 'Tổng sức mạnh tài khoản. Tổng của công trình/công nghệ/quân/anh hùng/xe',
    },
    {
      term: 'F2P (Free to Play)',
      ko: '무과금',
      vi: 'Chơi miễn phí',
      definition: isKorean
        ? '현금 결제 없이 플레이하는 방식'
        : 'Cách chơi không nạp tiền',
    },
    {
      term: 'AR (Alliance Recognition)',
      ko: '연맹 인정',
      vi: 'Alliance Recognition',
      definition: isKorean
        ? '일일 보상을 2배로 증가시키는 핵심 연구'
        : 'NC cốt lõi tăng gấp đôi phần thưởng hàng ngày',
    },
    {
      term: 'SVS (Server vs Server)',
      ko: '서버 대전',
      vi: 'Server vs Server',
      definition: isKorean
        ? '서버 간 대규모 전투 이벤트'
        : 'Sự kiện chiến đấu lớn giữa các server',
    },
    {
      term: 'Rally',
      ko: '랠리',
      vi: 'Rally',
      definition: isKorean
        ? '연맹원들이 함께 공격하는 집단 공격'
        : 'Tấn công tập thể cùng thành viên liên minh',
    },
    {
      term: isKorean ? '새벽의 날개' : 'Cánh Bình Minh',
      ko: '새벽의 날개',
      vi: 'Cánh Bình Minh',
      definition: isKorean
        ? '세 진영 중 하나. 블러디 로즈에 강함. 슈터 특화'
        : 'Một trong 3 phe. Mạnh chống Blood Rose. Chuyên Shooter',
    },
    {
      term: isKorean ? '블러디 로즈' : 'Blood Rose',
      ko: '블러디 로즈',
      vi: 'Blood Rose',
      definition: isKorean
        ? '세 진영 중 하나. 질서의 수호자에 강함. 돌격 특화'
        : 'Một trong 3 phe. Mạnh chống Người Bảo Vệ Trật Tự. Chuyên Assaulter',
    },
    {
      term: isKorean ? '질서의 수호자' : 'Người Bảo Vệ Trật Tự',
      ko: '질서의 수호자',
      vi: 'Người Bảo Vệ Trật Tự',
      definition: isKorean
        ? '세 진영 중 하나. 새벽의 날개에 강함. 라이더 특화'
        : 'Một trong 3 phe. Mạnh chống Cánh Bình Minh. Chuyên Rider',
    },
    {
      term: 'Assaulter',
      ko: '돌격',
      vi: 'Assaulter',
      definition: isKorean
        ? '병종. 높은 공격력, 낮은 방어력'
        : 'Loại quân. ATK cao, DEF thấp',
    },
    {
      term: 'Shooter',
      ko: '슈터',
      vi: 'Shooter',
      definition: isKorean
        ? '병종. 균형 잡힌 스탯'
        : 'Loại quân. Stat cân bằng',
    },
    {
      term: 'Rider',
      ko: '라이더',
      vi: 'Rider',
      definition: isKorean
        ? '병종. 높은 HP/방어력, 낮은 공격력'
        : 'Loại quân. HP/DEF cao, ATK thấp',
    },
    {
      term: 'Power Core',
      ko: '에너지코어',
      vi: 'Power Core',
      definition: isKorean
        ? '오렌지 장비 승급(헥사곤)에 필요한 재화'
        : 'Tiền tệ cần để thăng cấp (hexagon) trang bị cam',
    },
    {
      term: 'Hexagon',
      ko: '헥사곤',
      vi: 'Hexagon',
      definition: isKorean
        ? '장비 성급 시스템. 에너지코어로 업그레이드'
        : 'Hệ thống sao trang bị. Nâng bằng Power Core',
    },
    {
      term: 'Furylord',
      ko: '난폭 두목',
      vi: 'Furylord',
      definition: isKorean
        ? '일일 보스. 4회/일 (00/06/12/18시), 일요일 제외'
        : 'Boss hàng ngày. 4 lần/ngày (00/06/12/18h), trừ CN',
    },
    {
      term: 'Full Preparedness',
      ko: '전면전비',
      vi: 'Full Preparedness',
      definition: isKorean
        ? '일일 이벤트. 4시간마다 5개 테마가 순환 (건물, 연구, 차량, 영웅, 훈련). 연맹 대결과 겹칠 때 활동하면 보상 2배'
        : 'Sự kiện hàng ngày. 5 theme xoay vòng mỗi 4 tiếng (Xây, NC, Xe, Anh hùng, HL). Hoạt động khi trùng AD = thưởng gấp đôi',
    },
    {
      term: 'Valor Medals',
      ko: '발로 메달',
      vi: 'Valor Medals',
      definition: isKorean
        ? 'SVS 보상. 블랙마켓에서 오렌지 장비 교환 가능'
        : 'Thưởng SVS. Có thể đổi trang bị cam ở Black Market',
    },
    {
      term: 'Enhancement Alloy',
      ko: '강화 합금',
      vi: 'Enhancement Alloy',
      definition: isKorean
        ? '장비 레벨업에 필요한 재화'
        : 'Tiền tệ cần để lên level trang bị',
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
                      {item.ko} / {item.vi}
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
