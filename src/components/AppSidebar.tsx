import { Home, Target, Trophy, BookOpen, FlipVertical, GraduationCap, Info, HeartHandshake, ChevronRight, Award, Flame, Mic } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface AppSidebarProps {
  onNavigate: (page: any) => void;
  currentPage: string;
}

export function AppSidebar({ onNavigate, currentPage }: AppSidebarProps) {
  const menuItems = [
    {
      title: "Главная",
      icon: Home,
      action: "home",
    },
    {
      title: "Освоение",
      icon: Target,
      action: "learning-path",
    },
    {
      title: "Тест",
      icon: Trophy,
      action: "test-levels",
    },
    {
      title: "Карточки",
      icon: FlipVertical,
      action: "flashcards",
    },
    {
      title: "Учебные материалы",
      icon: BookOpen,
      action: "materials",
    },
    {
      title: "Достижения",
      icon: Award,
      action: "achievements",
    },
    {
      title: "Streak",
      icon: Flame,
      action: "streak",
    },
    {
      title: "Произношение",
      icon: Mic,
      action: "pronunciation",
    },
    {
      title: "Классы",
      icon: GraduationCap,
      subItems: [
        { title: "5 класс", action: "grade-5" },
        { title: "6 класс", action: "grade-6" },
        { title: "7 класс", action: "grade-7" },
        { title: "8 класс", action: "grade-8" },
        { title: "9 класс", action: "grade-9" },
      ],
    },
    {
      title: "Поддержка",
      icon: HeartHandshake,
      subItems: [
        { title: "Помощь", action: "help" },
        { title: "FAQ", action: "faq" },
      ],
    },
    {
      title: "О приложении",
      icon: Info,
      action: "about",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SmartSpeak</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    {item.subItems ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  onClick={() => onNavigate(subItem.action)}
                                  isActive={currentPage === subItem.action}
                                >
                                  <span>{subItem.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton
                        onClick={() => onNavigate(item.action!)}
                        isActive={currentPage === item.action}
                      >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}