import { Card } from "primereact/card";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import Attachments from "../attachment/Attachments";

interface GroupMediaProps {
    groupId?: string;
}
const GroupMedia : React.FC<GroupMediaProps> = ({groupId}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const items: MenuItem[] = [
        { label: 'Photos', icon: 'pi pi-images'},
        { label: 'Videos', icon: 'pi pi-video' },
    ];
    return (
        <Card >
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="text-sm" />
            <Attachments entityUploadId={groupId} mimeType={activeIndex == 0 ? 'photo' : 'video'} type="group" />
        </Card>
    )
}
export default GroupMedia