import React, { useState, useEffect, useMemo } from 'react';
import {
  ServiceProvider,
  ServiceCategory,
  NavigationTab,
  Review,
  Conversation,
  ChatMessage,
  ResidentProfile,
  SocietyNotification,
} from './types';
import {
  INITIAL_PROVIDERS,
  INITIAL_RESIDENT,
  INITIAL_NOTIFICATIONS,
} from './data/initialData';
import { AndroidFrame } from './components/AndroidFrame';
import { BottomNavigation } from './components/BottomNavigation';
import { ReviewBottomSheet } from './components/ReviewBottomSheet';
import { NotificationsModal } from './components/NotificationsModal';
import { MyReviewsModal } from './components/MyReviewsModal';
import { HelpSupportModal } from './components/HelpSupportModal';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { ProviderDetailScreen } from './screens/ProviderDetailScreen';
import { ChatScreen } from './screens/ChatScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { SavedScreen } from './screens/SavedScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ListBusinessScreen } from './screens/ListBusinessScreen';

const STORAGE_KEY_PROVIDERS = 'andour_connect_providers_v3';
const STORAGE_KEY_SAVED = 'andour_connect_saved_v3';
const STORAGE_KEY_CONVOS = 'andour_connect_convos_v3';
const STORAGE_KEY_NOTIFS = 'andour_connect_notifs_v3';

export default function App() {
  // 1. Providers State
  const [providers, setProviders] = useState<ServiceProvider[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROVIDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROVIDERS;
  });

  // 2. Saved Providers State
  const [savedProviderIds, setSavedProviderIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['nishal-nails-makeover', 'sachin-pal-fitness', 'lendrobe'];
  });

  // 3. Conversations State
  const [conversations, setConversations] = useState<Record<string, Conversation>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONVOS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    const defaultConvos: Record<string, Conversation> = {
      'nishal-nails-makeover': {
        providerId: 'nishal-nails-makeover',
        providerName: 'Nishal Nails & Makeover',
        providerFlat: 'Flat J-003',
        ownerName: 'Shalini Sharma',
        category: 'Beauty & Wellness',
        lastMessage: 'Hi neighbour! Gel extensions slot available today at 4:30 PM.',
        lastTimestamp: '10:42 AM',
        unreadCount: 1,
        messages: [
          {
            id: 'm1',
            sender: 'provider',
            text: 'Hello neighbour! Welcome to Nishal Nails & Makeover in Flat J-003. We offer French gel extensions, lash lifts, and bridal makeovers.',
            timestamp: '10:30 AM',
            status: 'read',
          },
          {
            id: 'm2',
            sender: 'user',
            text: 'Hi Shalini! Do you have any availability for gel extensions today?',
            timestamp: '10:38 AM',
            status: 'read',
          },
          {
            id: 'm3',
            sender: 'provider',
            text: 'Hi neighbour! Gel extensions slot available today at 4:30 PM in J-003. Shall I book it for you?',
            timestamp: '10:42 AM',
            status: 'read',
          },
        ],
      },
      'sachin-pal-fitness': {
        providerId: 'sachin-pal-fitness',
        providerName: 'Sachin Pal',
        providerFlat: 'Flat M 104',
        ownerName: 'Sachin Pal',
        category: 'Health & Fitness',
        lastMessage: 'Morning fitness batch starts 6:30 AM at Central Lawn.',
        lastTimestamp: 'Yesterday',
        unreadCount: 0,
        messages: [
          {
            id: 'ms1',
            sender: 'provider',
            text: 'Namaste! I conduct marathon prep, pilates, and back/knee pain rehab sessions for Andour Heights residents.',
            timestamp: 'Yesterday',
            status: 'read',
          },
        ],
      },
    };
    return defaultConvos;
  });

  // 4. Notifications State
  const [notifications, setNotifications] = useState<SocietyNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Resident Profile State
  const [resident] = useState<ResidentProfile>(INITIAL_RESIDENT);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedProviderForDetail, setSelectedProviderForDetail] = useState<ServiceProvider | null>(null);
  const [selectedProviderForChat, setSelectedProviderForChat] = useState<ServiceProvider | null>(null);
  const [exploreInitialCategory, setExploreInitialCategory] = useState<ServiceCategory>('All');
  const [exploreInitialSearch, setExploreInitialSearch] = useState<string>('');

  // Modals & Bottom Sheets
  const [reviewModalProvider, setReviewModalProvider] = useState<ServiceProvider | null>(null);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showListBusinessScreen, setShowListBusinessScreen] = useState(false);
  const [showMyReviewsModal, setShowMyReviewsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROVIDERS, JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedProviderIds));
  }, [savedProviderIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONVOS, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  // Derived Counts
  const unreadMessagesCount = useMemo(() => {
    return Object.values(conversations).reduce((sum, c) => sum + (c.unreadCount || 0), 0);
  }, [conversations]);

  const unreadNotifCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const savedProvidersList = useMemo(() => {
    return providers.filter((p) => savedProviderIds.includes(p.id));
  }, [providers, savedProviderIds]);

  // Actions
  const handleToggleSave = (providerId: string) => {
    setSavedProviderIds((prev) =>
      prev.includes(providerId) ? prev.filter((id) => id !== providerId) : [...prev, providerId]
    );
  };

  const handleOpenProvider = (provider: ServiceProvider) => {
    setSelectedProviderForDetail(provider);
  };

  const handleOpenChat = (provider: ServiceProvider) => {
    // Initialize conversation if doesn't exist
    if (!conversations[provider.id]) {
      const newConvo: Conversation = {
        providerId: provider.id,
        providerName: provider.name,
        providerFlat: provider.flatNo,
        ownerName: provider.ownerName,
        category: provider.category,
        lastMessage: 'Conversation started',
        lastTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unreadCount: 0,
        messages: [
          {
            id: `init-${Date.now()}`,
            sender: 'provider',
            text: `Namaste! Welcome to ${provider.name}. I am in ${provider.flatNo}. How can I assist you today?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read',
          },
        ],
      };
      setConversations((prev) => ({ ...prev, [provider.id]: newConvo }));
    } else {
      // Clear unread count
      setConversations((prev) => ({
        ...prev,
        [provider.id]: { ...prev[provider.id], unreadCount: 0 },
      }));
    }

    setSelectedProviderForChat(provider);
  };

  const handleSendMessage = (providerId: string, text: string, sharedServiceInfo?: any) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp,
      status: 'delivered',
      sharedServiceInfo,
    };

    const targetProvider = providers.find((p) => p.id === providerId);
    if (!targetProvider) return;

    // 1. Add user message
    setConversations((prev) => {
      const current = prev[providerId] || {
        providerId,
        providerName: targetProvider.name,
        providerFlat: targetProvider.flatNo,
        ownerName: targetProvider.ownerName,
        category: targetProvider.category,
        lastMessage: text,
        lastTimestamp: timestamp,
        unreadCount: 0,
        messages: [],
      };

      return {
        ...prev,
        [providerId]: {
          ...current,
          lastMessage: text,
          lastTimestamp: timestamp,
          messages: [...current.messages, userMsg],
        },
      };
    });

    // 2. Real-Time Provider Simulation Reply after 950ms
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let replyText = `Hello neighbour! Thank you for messaging ${targetProvider.name}. Yes, I am in ${targetProvider.flatNo} (${targetProvider.tower}). What day or time works best for you?`;

      const lower = text.toLowerCase();
      if (lower.includes('available') || lower.includes('today') || lower.includes('free') || lower.includes('visit')) {
        replyText = `Yes! I am available today in ${targetProvider.flatNo}. My hours are ${targetProvider.workingHours.hours}. You are welcome to drop by or we can coordinate a visit!`;
      } else if (lower.includes('rate') || lower.includes('price') || lower.includes('charge') || lower.includes('cost')) {
        replyText = `Our services typically range around ${targetProvider.priceRange || 'affordable resident rates'}. Feel free to call me directly at ${targetProvider.phone} anytime!`;
      } else if (lower.includes('doorstep') || lower.includes('home visit')) {
        replyText = `Yes, I do doorstep visits across all towers in Andour Heights. Which flat are you in?`;
      } else if (lower.includes('photo') || lower.includes('reference')) {
        replyText = `Got the photo! This looks wonderful and we can customize it exactly to your preference in ${targetProvider.flatNo}.`;
      }

      const providerReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'provider',
        text: replyText,
        timestamp: replyTime,
        status: 'read',
      };

      setConversations((prev) => {
        const curr = prev[providerId];
        if (!curr) return prev;
        return {
          ...prev,
          [providerId]: {
            ...curr,
            lastMessage: replyText,
            lastTimestamp: replyTime,
            messages: [
              ...curr.messages.map((m) => (m.sender === 'user' ? { ...m, status: 'read' as const } : m)),
              providerReply,
            ],
          },
        };
      });
    }, 1000);
  };

  const handleSubmitReview = (providerId: string, newReview: Review) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === providerId) {
          const updatedReviews = [newReview, ...p.reviews];
          const sumRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvg = Number((sumRatings / updatedReviews.length).toFixed(1));

          // update distribution
          const dist = { ...p.distribution };
          if (newReview.rating === 5) dist.star5++;
          else if (newReview.rating === 4) dist.star4++;
          else if (newReview.rating === 3) dist.star3++;
          else if (newReview.rating === 2) dist.star2++;
          else dist.star1++;

          return {
            ...p,
            rating: newAvg,
            reviewCount: updatedReviews.length,
            distribution: dist,
            reviews: updatedReviews,
          };
        }
        return p;
      })
    );

    // Also update selectedProviderForDetail if currently viewing
    if (selectedProviderForDetail && selectedProviderForDetail.id === providerId) {
      setSelectedProviderForDetail((curr) => {
        if (!curr) return null;
        const updatedReviews = [newReview, ...curr.reviews];
        const sumRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAvg = Number((sumRatings / updatedReviews.length).toFixed(1));
        const dist = { ...curr.distribution };
        if (newReview.rating === 5) dist.star5++;
        else if (newReview.rating === 4) dist.star4++;
        else if (newReview.rating === 3) dist.star3++;
        else if (newReview.rating === 2) dist.star2++;
        else dist.star1++;

        return {
          ...curr,
          rating: newAvg,
          reviewCount: updatedReviews.length,
          distribution: dist,
          reviews: updatedReviews,
        };
      });
    }
  };

  const handleToggleReviewHelpful = (providerId: string, reviewId: string) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === providerId) {
          const updated = p.reviews.map((r) => {
            if (r.id === reviewId) {
              const isHelpful = !r.isHelpfulByUser;
              return {
                ...r,
                isHelpfulByUser: isHelpful,
                helpfulCount: isHelpful ? r.helpfulCount + 1 : Math.max(0, r.helpfulCount - 1),
              };
            }
            return r;
          });
          return { ...p, reviews: updated };
        }
        return p;
      })
    );

    if (selectedProviderForDetail && selectedProviderForDetail.id === providerId) {
      setSelectedProviderForDetail((curr) => {
        if (!curr) return null;
        const updated = curr.reviews.map((r) => {
          if (r.id === reviewId) {
            const isHelpful = !r.isHelpfulByUser;
            return {
              ...r,
              isHelpfulByUser: isHelpful,
              helpfulCount: isHelpful ? r.helpfulCount + 1 : Math.max(0, r.helpfulCount - 1),
            };
          }
          return r;
        });
        return { ...curr, reviews: updated };
      });
    }
  };

  const handleAddBusinessSubmit = (newProvider: ServiceProvider) => {
    setProviders((prev) => [newProvider, ...prev]);
    // Also add to notifications
    const newNotif: SocietyNotification = {
      id: `notif-${Date.now()}`,
      title: 'Your Business is Live!',
      body: `${newProvider.name} has been published in Andour Heights directory. Neighbours can now find you.`,
      timestamp: 'Just now',
      type: 'business',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <AndroidFrame>
      {/* SCREEN CONTAINER WITH MULTI-SCREEN ROUTING */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        
        {/* VIEW 1: Active Chat Screen */}
        {selectedProviderForChat ? (
          <ChatScreen
            provider={selectedProviderForChat}
            conversation={conversations[selectedProviderForChat.id] || {
              providerId: selectedProviderForChat.id,
              providerName: selectedProviderForChat.name,
              providerFlat: selectedProviderForChat.flatNo,
              ownerName: selectedProviderForChat.ownerName,
              category: selectedProviderForChat.category,
              lastMessage: '',
              lastTimestamp: '',
              unreadCount: 0,
              messages: [],
            }}
            onBack={() => setSelectedProviderForChat(null)}
            onSendMessage={handleSendMessage}
          />
        ) : selectedProviderForDetail ? (
          /* VIEW 2: Service Provider Detail Screen */
          <ProviderDetailScreen
            provider={selectedProviderForDetail}
            isSaved={savedProviderIds.includes(selectedProviderForDetail.id)}
            onBack={() => setSelectedProviderForDetail(null)}
            onOpenChat={(p) => {
              setSelectedProviderForDetail(null);
              handleOpenChat(p);
            }}
            onToggleSave={handleToggleSave}
            onOpenReviewModal={(p) => setReviewModalProvider(p)}
            onToggleReviewHelpful={handleToggleReviewHelpful}
          />
        ) : showListBusinessScreen ? (
          /* VIEW 3: List Your Business Multi-Step Form */
          <ListBusinessScreen
            onBack={() => setShowListBusinessScreen(false)}
            onSubmit={handleAddBusinessSubmit}
            defaultTower={resident.tower}
            defaultFlat={resident.flatNo}
          />
        ) : (
          /* VIEW 4: Main 5 Bottom Navigation Destinations */
          <>
            {currentTab === 'home' && (
              <HomeScreen
                providers={providers}
                resident={resident}
                savedProviderIds={savedProviderIds}
                unreadNotificationCount={unreadNotifCount}
                onOpenNotifications={() => setShowNotificationsModal(true)}
                onOpenProfileTab={() => setCurrentTab('profile')}
                onSearchFocus={() => {
                  setExploreInitialCategory('All');
                  setExploreInitialSearch('');
                  setCurrentTab('explore');
                }}
                onSelectCategory={(cat) => {
                  setExploreInitialCategory(cat);
                  setExploreInitialSearch('');
                  setCurrentTab('explore');
                }}
                onOpenProvider={handleOpenProvider}
                onOpenChat={handleOpenChat}
                onToggleSave={handleToggleSave}
                onOpenExplore={() => {
                  setExploreInitialCategory('All');
                  setCurrentTab('explore');
                }}
              />
            )}

            {currentTab === 'explore' && (
              <ExploreScreen
                providers={providers}
                savedProviderIds={savedProviderIds}
                initialCategory={exploreInitialCategory}
                initialSearchQuery={exploreInitialSearch}
                onBackToHome={() => setCurrentTab('home')}
                onOpenProvider={handleOpenProvider}
                onOpenChat={handleOpenChat}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentTab === 'messages' && (
              <MessagesScreen
                conversations={conversations}
                allProviders={providers}
                onOpenConversation={(provId) => {
                  const p = providers.find((prov) => prov.id === provId);
                  if (p) handleOpenChat(p);
                }}
                onStartNewChat={() => setCurrentTab('explore')}
              />
            )}

            {currentTab === 'saved' && (
              <SavedScreen
                savedProviders={savedProvidersList}
                onOpenProvider={handleOpenProvider}
                onOpenChat={handleOpenChat}
                onToggleSave={handleToggleSave}
                onExplore={() => setCurrentTab('explore')}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileScreen
                resident={resident}
                savedCount={savedProviderIds.length}
                reviewsCount={4}
                unreadMessagesCount={unreadMessagesCount}
                onOpenSavedTab={() => setCurrentTab('saved')}
                onOpenMessagesTab={() => setCurrentTab('messages')}
                onOpenNotifications={() => setShowNotificationsModal(true)}
                onOpenListBusiness={() => setShowListBusinessScreen(true)}
                onShowReviewsModal={() => setShowMyReviewsModal(true)}
                onShowHelpModal={() => setShowHelpModal(true)}
              />
            )}

            {/* Bottom Navigation (Visible on top-level tabs) */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <BottomNavigation
                currentTab={currentTab}
                onSelectTab={(tab) => {
                  setCurrentTab(tab);
                  // Reset explore initial category if navigating directly
                  if (tab === 'explore' && currentTab !== 'explore') {
                    setExploreInitialCategory('All');
                    setExploreInitialSearch('');
                  }
                }}
                unreadCount={unreadMessagesCount}
                savedCount={savedProviderIds.length}
              />
            </div>
          </>
        )}

        {/* MODAL 1: Review Bottom Sheet */}
        {reviewModalProvider && (
          <ReviewBottomSheet
            provider={reviewModalProvider}
            residentName={resident.name}
            residentFlat={resident.flatNo}
            onClose={() => setReviewModalProvider(null)}
            onSubmitReview={handleSubmitReview}
          />
        )}

        {/* MODAL 2: Notifications Modal */}
        {showNotificationsModal && (
          <NotificationsModal
            notifications={notifications}
            onClose={() => setShowNotificationsModal(false)}
            onMarkAllAsRead={() => {
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            }}
          />
        )}

        {/* MODAL 3: My Reviews History Modal */}
        {showMyReviewsModal && (
          <MyReviewsModal
            onClose={() => setShowMyReviewsModal(false)}
            providers={providers}
            residentName={resident.name}
          />
        )}

        {/* MODAL 4: Help & Support Modal */}
        {showHelpModal && (
          <HelpSupportModal onClose={() => setShowHelpModal(false)} />
        )}

      </div>
    </AndroidFrame>
  );
}
