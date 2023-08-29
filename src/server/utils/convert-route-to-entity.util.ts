const mapping: Record<string, string> = {
  appointments: 'appointment',
  guests: 'guest',
  'insurance-providers': 'insurance_provider',
  'medical-staffs': 'medical_staff',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
