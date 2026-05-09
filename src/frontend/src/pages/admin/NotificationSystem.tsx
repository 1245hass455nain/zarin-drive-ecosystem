import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNotificationStore } from "../../stores/notificationStore";
import type {
  NotificationTarget,
  NotificationType,
} from "../../stores/notificationStore";

export default function NotificationSystem() {
  const { notifications, addNotification } = useNotificationStore();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<NotificationTarget>("customer");
  const [type, setType] = useState<NotificationType>("system");
  const [sending, setSending] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      addNotification({ title, message, type, target });
      toast.success(`Notification sent to all ${target}s`);
      setTitle("");
      setMessage("");
      setSending(false);
    }, 600);
  }

  const TYPE_COLORS: Record<NotificationType, string> = {
    ride: "bg-blue-500/10 text-blue-400",
    promo: "bg-primary/10 text-primary",
    wallet: "bg-green-500/10 text-green-400",
    system: "bg-muted text-muted-foreground",
    alert: "bg-destructive/10 text-destructive",
  };

  const adminNotifs = notifications.slice(0, 20);

  return (
    <div className="p-6 space-y-6" data-ocid="admin.notifications.page">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose */}
        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" /> Compose Notification
          </h3>
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification title..."
                required
                data-ocid="admin.notifications.title_input"
              />
            </div>
            <div className="space-y-1">
              <Label>Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                rows={4}
                required
                data-ocid="admin.notifications.message_textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Send To</Label>
                <Select
                  value={target}
                  onValueChange={(v) => setTarget(v as NotificationTarget)}
                >
                  <SelectTrigger data-ocid="admin.notifications.target_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">All Customers</SelectItem>
                    <SelectItem value="driver">All Drivers</SelectItem>
                    <SelectItem value="admin">Admin Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Type</Label>
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as NotificationType)}
                >
                  <SelectTrigger data-ocid="admin.notifications.type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="promo">Promotion</SelectItem>
                    <SelectItem value="ride">Ride Update</SelectItem>
                    <SelectItem value="wallet">Wallet Alert</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={sending}
              data-ocid="admin.notifications.send_button"
            >
              <Send className="w-4 h-4 mr-2" />{" "}
              {sending ? "Sending..." : "Send Notification"}
            </Button>
          </form>
        </Card>

        {/* History */}
        <Card className="p-5 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-4">
            Notification History
          </h3>
          {adminNotifs.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="admin.notifications.empty_state"
            >
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No notifications sent yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {adminNotifs.map((n, i) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  data-ocid={`admin.notifications.item.${i + 1}`}
                >
                  <Badge
                    className={[
                      "text-xs capitalize flex-shrink-0",
                      TYPE_COLORS[n.type],
                    ].join(" ")}
                  >
                    {n.type}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {n.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      To: {n.target} · {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
