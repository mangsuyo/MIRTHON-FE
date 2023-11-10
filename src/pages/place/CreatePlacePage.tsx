import { useEffect, useState } from "react";
import Title from "../../components/common/Title";
import BookingSection, {
  formInfo,
} from "../../components/booking/BookingSection";
import { FormProvider, useForm } from "react-hook-form";
import FilteringSection from "../../components/category/FilteringSection";
import FormTextArea from "../../components/form/FormTextArea";

const basicSectionFromData: formInfo[] = [
  {
    formType: "input",
    subTitle: "사업자 등록번호",
    name: "licenseNum",
    placeholder: "사업자 등록번호를 입력해주세요",
    type: "number",
    disabled: false,
    required: true,
  },
];

const makePlaceSectionFromData = (needImpossibleDate: boolean): formInfo[] => {
  return [
    {
      formType: "input",
      subTitle: "사업장 이름",
      name: "placeName",
      placeholder: "사업장 이름을 입력해주세요",
      type: "text",
      disabled: false,
      required: true,
    },
    {
      formType: "input",
      subTitle: "월 임대료",
      name: "cost",
      placeholder: "임대료를 입력해주세요",
      type: "number",
      disabled: false,
      required: true,
    },
    {
      formType: "date-range",
      subTitle: "계약 불가능 기간 설정 ",
      name: "impossibleDate",
      placeholder: "",
      disabled: needImpossibleDate ? false : true,
      required: true,
    },
  ];
};
const CreatePlacePage = () => {
  const methods = useForm({ mode: "onChange" });

  const [filterBusinessList, setFilterBusinessList] = useState<string[]>([]);
  const [filterLocationList, setFilterLocationList] = useState<string[]>([]);
  const [placeSectionFromData, setPlaceSectionFromData] = useState<any[]>([]);
  const [needImpossibleDate, setNeedImpossibleDate] = useState<boolean>(true);
  console.log(needImpossibleDate);

  useEffect(() => {
    setPlaceSectionFromData(makePlaceSectionFromData(needImpossibleDate));
  }, [needImpossibleDate]);

  return (
    <article className={`flex w-full flex-col gap-10`}>
      <Title title={"공간 정보 등록"}></Title>

      <FormProvider {...methods}>
        <form>
          <BookingSection
            title={null}
            data={basicSectionFromData}
          ></BookingSection>

          <div
            className={`flex flex-col gap-[3.75rem] pb-16 basic-border-bottom`}
          >
            <FilteringSection
              type={"business"}
              onClickEvent={(list) => {
                setFilterBusinessList(list);
              }}
            />
            <FilteringSection
              type={"location"}
              onClickEvent={(list) => {
                setFilterLocationList(list);
              }}
            />
          </div>

          <div>
            <BookingSection
              title={null}
              data={placeSectionFromData}
            ></BookingSection>
            <div className="px-32 flex gap-4">
              <input
                type="radio"
                checked={!needImpossibleDate}
                onClick={() => setNeedImpossibleDate(!needImpossibleDate)}
              ></input>
              <label className={`text-my-green text-sm`}>
                계약 불가능 기간 미설정{" "}
              </label>
            </div>

            <div className={`flex gap-8`}>
              <div className={`grid grid-cols-2 flex-grow flex-wrap gap-4`}>
                <div className={` bg-my-light-green rounded-xl`}></div>
                <div className={` bg-my-light-green rounded-xl`}></div>
                <div className={` bg-my-light-green rounded-xl`}></div>
                <div className={` bg-my-light-green rounded-xl`}></div>
              </div>
              <div className={`flex-grow`}>
                <FormTextArea
                  name={"article"}
                  placeholder={"자신의 공유공간의 정보를 입력해주세요."}
                  disabled={false}
                  required={true}
                  minWidth={"10px"}
                ></FormTextArea>
              </div>
            </div>

            <div></div>
          </div>
        </form>
      </FormProvider>
    </article>
  );
};

export default CreatePlacePage;